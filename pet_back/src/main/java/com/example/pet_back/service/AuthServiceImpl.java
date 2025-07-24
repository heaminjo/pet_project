package com.example.pet_back.service;

import com.example.pet_back.constant.ADDRTYPE;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.custom.ErrorResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.login.TokenDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.RefreshToken;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import com.example.pet_back.repository.RefreshTokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2

public class AuthServiceImpl implements AuthService {
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final MemberMapper mapper;
    private final RefreshTokenRepository refreshTokenRepository;
    //인증 관련 설정을 구성하기 위한 클래스이며 Authentication을 반환
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    //로그인
    @Override
    @Transactional
    public ApiResponse<?> login(HttpServletResponse response, LoginRequestDTO dto) {
        try {
            //email과 pw기반으로 AuthenticationToken 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            dto.getEmail(), dto.getPassword()
                    );

            //실제 검증(비밀번호 체크)
            //사용자의 ID/비밀번호(authenticationToken)를 받아 인증 절차 실행 후 인증객체(Authentication) 생성
            //여기에서 DB조회가 이루어지며 권한(role)을 포함한 Authentication객체 반환
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            //인증 정보 기반으로 토큰 생성
            //로그인 직후 이므로 refreshToken과  AccessToken 모두 생성해서 발급한다.
            TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);

            //마지막 로그인 시간 저장을 위해 id를 꺼낸다.
            Long userId = tokenProvider.getUserId(tokenDTO.getAccessToken());

            Member member = memberRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            LocalDateTime lastLogin = member.getLastLogin();

            //만약 마지막 로그인이 null이거나 오늘보다 전날(isBefore) 이라면 누적
            if(lastLogin == null || lastLogin.toLocalDate().isBefore(LocalDate.now())){
                member.setLoginCount(member.getLoginCount() + 1);
            }
            //그리고 난 뒤 현재 시각으로 마지막 로그인 업데이트
            member.setLastLogin(LocalDateTime.now());

            //RefreshToken DB 저장하기
            RefreshToken refreshToken = RefreshToken.builder()
                    .userId(tokenProvider.getUserId(tokenDTO.getAccessToken()))
                    .token(tokenDTO.getRefreshToken())
                    .expiration(tokenDTO.getAccessTokenExpiresln())
                    .build();

            //refreshToken은 쿠키에 저장
            Cookie refreshTokenCookie = new Cookie("refreshToken", tokenDTO.getRefreshToken());

            refreshTokenCookie.setHttpOnly(true);    //JS 접근 불가
            refreshTokenCookie.setSecure(false);      // HTTPS 연결에서만 전송
            refreshTokenCookie.setPath("/");        //모든 경로에서 전송
            refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7일 유지

            response.addCookie(refreshTokenCookie);

            //Cookie 객체는 SameSite 속성을 기본적으로 지원하지 않기 때문에 setHeader로 직접 설정
            //secure는 HTTPS 연결에서만 브라우저로 전송
            //HTTP 연결을 하므로 false 해야한다.


//            response.setHeader("Set-Cookie",
//                    "refreshToken=" + tokenDTO.getRefreshToken() +
//                            "; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax");

            log.info("일반 로그인 성공 - userId :"+userId);

            refreshTokenRepository.save((refreshToken));
            //커스텀 응답 객체에 token을 담아 반환
            return new ApiResponse<TokenDTO>(true, tokenDTO, "로그인에 성공하였습니다.");
        } catch (Exception e) {
            log.info("로그인 중 에러 발생 =>" + e.getMessage());
            return new ApiResponse<>(false, "잘못된 아이디 또는 비밀번호를 입력하셨습니다.");
        }
    }

    //회원가입
    @Override
    @Transactional
    //유저와 주소중 하나만 저장되는 것을 방지
    public ResponseEntity<?> join(MemberRequestDTO dto) {

        try {
            dto.setPassword(passwordEncoder.encode(dto.getPassword()));
            log.info("비밀번호 암호화 완료 => " + dto.getPassword());
            log.info("성별 확인 " + mapper.toEntity(dto).getGender());
            //회원을 저장하고 member 엔티티를 반환
            Member member = memberRepository.save(mapper.toEntity(dto));
            //address 생성 후 저장
            addressRepository.save(new Address(member, dto.getAddress1(), dto.getAddress2(), dto.getAddressZip(), ADDRTYPE.DEFAULT, "집"));
            log.info("저장된 회원의 식별자 => " + member.getId());
            return ResponseEntity.ok().body(new ApiResponse<>(true, "회원가입에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.ok().body(new ApiResponse<>(false, "회원가입에 실패하였습니다."));
        }
    }

    //리프레쉬 토큰

    //refreshToken으로 사용자 아이디 추출 후
    //사용자 정보로 Authentication 생성 후 accessToken만 생성한다.
    @Override
    @Transactional
    public ResponseEntity<?> getRefresh(String refreshToken, HttpServletResponse response) {
        //db 조회를 통해 리프레쉬 토큰의 유효성을 다시 검증
        Optional<RefreshToken> rToken = refreshTokenRepository.findByToken(refreshToken);

        //만약 DB에 RefreshToken이 없다면 유효하지 않은 토큰(잘못입력 예시)
        if (rToken.isEmpty()) {
            //DB에서 삭제
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(HttpStatus.UNAUTHORIZED, "유효하지 않는 RefreshToken입니다.", "401"));
        }
        log.info("DB 조회 성공 유효한 RefreshToken 입니다.");

        try {
            //refreshToken을 통해 유저 Id를 가져온다.
            Long userId = tokenProvider.getUserId(refreshToken);

            //userId를 통해 tokenProvider에서 유저의 정보를 담은 Authentication 객체를 가져온다
            Authentication authentication = tokenProvider.getAuthentication(userId);

            //새로운 access토큰 생성
            TokenDTO tokenDTO = tokenProvider.createToken(authentication);
            log.info("새로운 토큰 발급 => "+ tokenDTO.getAccessToken());
            return ResponseEntity.ok(new ApiResponse<TokenDTO>(true, tokenDTO, "토큰 재발급 성공"));
        } catch (ExpiredJwtException e) {
            log.info("만료된 RefreshToken입니다.");

            //쿠키 삭제
            Cookie refreshCookie = new Cookie("refreshToken", null);
            refreshCookie.setPath("/");             // 쿠키 경로 설정 (생성할 때와 같아야 함)
            refreshCookie.setMaxAge(0);             // 유효기간 0 → 삭제
            refreshCookie.setHttpOnly(true);        // 보안 옵션
            refreshCookie.setSecure(true);          // HTTPS만 전달 (필요시)
            response.addCookie(refreshCookie);

            //만료되었다면 db에서 삭제
            refreshTokenRepository.deleteByToken(refreshToken);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(HttpStatus.UNAUTHORIZED, "만료되었습니다. 다시 로그인 해주세요.", "401"));
        }
    }

    @Override
    @Transactional
    public ApiResponse logout(CustomUserDetails userDetails,HttpServletResponse response) {
        //리프레쉬 제거
        refreshTokenRepository.deleteByUserId(userDetails.getMember().getId());

        //쿠키 삭제
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setPath("/");             // 쿠키 경로 설정 (생성할 때와 같아야 함)
        refreshCookie.setMaxAge(0);             // 유효기간 0 → 삭제
        refreshCookie.setHttpOnly(true);        // 보안 옵션
        refreshCookie.setSecure(true);          // HTTPS만 전달 (필요시)
        response.addCookie(refreshCookie);
        
        return new ApiResponse<>(true, "로그아웃 성공입니다.");
    }
}
