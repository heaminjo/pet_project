package com.example.pet_back.service;

import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.custom.ErrorResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.login.TokenDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.RefreshToken;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import com.example.pet_back.repository.RefreshTokenRepository;
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

import java.beans.Transient;

@Service
@RequiredArgsConstructor
@Log4j2

public class AuthServiceImpl implements  AuthService{
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

    public ApiResponse<?> login(LoginRequestDTO dto) {
        try {
            //email과 pw기반으로 AuthenticationToken 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            dto.getEmail(), dto.getPassword()
                    );
            log.info("AuthServiceImple : email => " + authenticationToken.getName());
            //실제 검증(비밀번호 체크)
            //사용자의 ID/비밀번호(authenticationToken)를 받아 인증 절차 실행 후 인증객체(Authentication) 생성
            //여기에서 DB조회가 이루어지며 권한(role)을 포함한 Authentication객체 반환
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            log.info("Authentication => " + authentication);

            //인증 정보 기반으로 토큰 생성
            //로그인 직후 이므로 refreshToken과  AccessToken 모두 생성해서 발급한다.
            TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);

            log.info("토큰 발급 => " + tokenDTO);


            //RefreshToken DB 저장하기
            RefreshToken refreshToken = RefreshToken.builder()
                    .userId(tokenProvider.getUserId(tokenDTO.getAccessToken()))
                    .token(tokenDTO.getRefreshToken())
                    .expiration(tokenDTO.getAccessTokenExpiresln())
                    .build();

            refreshTokenRepository.save((refreshToken));
            //커스텀 응답 객체에 token을 담아 반환
            return new ApiResponse<TokenDTO>(true,tokenDTO,"로그인에 성공하였습니다.");
        } catch (Exception e) {
            log.info("로그인 중 에러 발생 =>"+e.getMessage());
            return new ApiResponse<>(false,"아이디 또는 비밀번호가 일치하지 않습니다.");
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

            //회원을 저장하고 member 엔티티를 반환
            Member member = memberRepository.save(mapper.toEntity(dto));

            //address 생성 후 저장
            addressRepository.save(new Address(member, dto.getAddress1(), dto.getAddress2(), dto.getAddressZip()));
            log.info("저장된 회원의 식별자 => " + member.getId());
            return ResponseEntity.ok(new ApiResponse<>(true, "회원가입에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST,"회원가입에 실패하였습니다.","400"));
        }
    }
}
