package com.example.pet_back.jwt;

import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.domain.login.TokenDTO;
import com.example.pet_back.entity.Member;
import com.example.pet_back.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

//JWT 토큰을 생성 , 파싱 ,검증하는 클래스
// JWT관련 모든 기능을 담당한다.
@Service
@Log4j2
@RequiredArgsConstructor
public class TokenProvider {
    //암호화 된 SECRETKEY 객체 생성
    //보안 강도가 높다.
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private static final String BEARER_TYPE = "Bearer"; // 토큰이 어떤 방식으로 발급되었는지
    private static final long ACCESS_TOKEN_EXPIRE_TIME =1000 * 60 * 30;   // 30분(1000 * 60 * 30)
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // (1000 * 60 * 60 * 24 * 7)7일
    private final CustomUserDetailsService customUserDetailsService;
    private final MemberRepository memberRepository;

    //AccessToken만 생성
    public TokenDTO createToken(Authentication authentication) {

        //사용자 인증 객체에서 권한을 가져온다.
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null); //없을 경우 null

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getMember().getId();

        log.info("userId => " + userId);


        //Jwts는 토큰 생성 보관을 지원하는 클래스이다.
        //Json 생성,서명,인코딩,디코딩,파싱등  토큰 관리 기능 제공

        //만료시간 30 분
        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

        //accessToken(사용자 정보,권한 정보,만료시간)
        String accessToken = Jwts.builder()
                //header에 들어갈 내용 및 서명을 위한 비밀키
                //HS512 알고리즘으로 서명한다.
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .claim("role", role)  //payload에 권한 저장
                .setSubject(String.valueOf(userId)) // payload에 이메일 저장
                //토큰을 발급한 주체
                .setIssuer("몽냥마켓")
                //토큰 발급시간
                .setIssuedAt(new Date())
                //토큰 만료 시간
                .setExpiration(accessTokenExpiresIn)
                .compact();

        return TokenDTO.builder()
                .role(role)
                .accessToken(accessToken)
                .accessTokenExpiresln(accessTokenExpiresIn.getTime()) //만료시간
                .refreshToken(null)
                .build();
    }

    //로그인 직후 RefreshToken+Access 토큰 둘다 발급
    public TokenDTO generateTokenDto(Authentication authentication) {

        log.info("로그인 직후 AccessToken과 refreshToken을 둘 다 발급합니다.");
        //사용자 인증 객체에서 권한을 가져온다.
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null); //없을 경우 null


        //유저 아이디를 꺼내온다.
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

//        탈퇴한 회원인지 검사
        if (userDetails.getMember().getMemberState() == MEMBERSTATE.WITHDRAWN) {
            throw new DisabledException("탈퇴한 계정입니다.");
        }

        Long userId = userDetails.getMember().getId();

        long now = (new Date()).getTime();

        //AccessToken 생성
        //만료시간 30분
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .claim("role", role)  //payload에 권한 저장
                .setSubject(String.valueOf(userId)) // payload에 id 를 꺼내기 위해 principal
                .setIssuer("몽냥마켓")
                .setIssuedAt(new Date())
                .setExpiration(accessTokenExpiresIn)
                .compact();

        log.info("AccessToken 생성 => "+ accessToken);

        //RefreshToken 생성
        //만료 기간 7일
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        String refreshToken = Jwts.builder()
                .setExpiration(refreshTokenExpiresIn)
                .setSubject(String.valueOf(userId)) // payload에 id 를 꺼내기 위해 principal
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();

        log.info("RefreshToken 생성 => "+refreshToken);
        return TokenDTO.builder()
                .memberName(userDetails.getMember().getName())
                .role(role)//
                .accessToken(accessToken)
                .accessTokenExpiresln(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }


    //전달 받은 토큰 검증
    //Claim 정보 (사용자 정보, 만료 시간 등)을 추출해서 Map<String,Object> 형태로 반환
    public Map<String, Object> validateToken(String token, HttpServletResponse response) throws IOException {
        //Jwts.parser() : JWT를 파싱(해석) 하기 위한 객체 (체인형식)
        //setSingningKey(SECRET_KEY) : 토큰 서명을 검증하기 위한 비밀키
        //      토큰을 생성할 때 사용한 키와 동일해야한다.


        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY).build()
                    //전달받은 JWT 문자열을 파싱해서 Claims객체로 변환
                    //유효하지 않은 토큰일 경우 Exception이 발생
                    .parseClaimsJws(token)
                    //JWT에 Claims영역을 가져온다. 반환타입은 Map
                    .getBody();

            //존재하지 않는 회원 처리
            Member member = memberRepository.findById(Long.parseLong(claims.getSubject())).orElseThrow(() -> new AuthenticationServiceException("존재하지 않는 회원입니다."));
            //탈퇴회원 처리
            if (member.getMemberState() == MEMBERSTATE.WITHDRAWN) throw new DisabledException("탈퇴한 계정입니다.");
            return claims;
        } catch (ExpiredJwtException e) {
            //만료된 토큰일 경우
            //클라이언트에게 401 값을 보내어 refresh를 통해 다시 토큰을 재발급하라고 한다.
            //만료된 Token이라는 메시지
            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "만료된 계정입니다. 다시 로그인 해주세요.");

            return null;
        } catch (DisabledException e) {
            //탈퇴한 계정입니다.
            log.info("탈퇴한 계정 입니다.");
            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "탈퇴한 계정입니다.");
            return null;
        } catch (AuthenticationServiceException e) {
            log.info("아이디 또는 비밀번호가 틀렸습니다.");
            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "존재하지 않는 회원입니다.");
            return null;
        }

    }

    //토큰에서 id 추출
    public Long getUserId(String token) {
        Claims claims = parseClaims(token);
        //userId를 Long 타입으로 변환하여 반환
        return Long.parseLong(claims.getSubject());
    }

    //권한 반환
    public String getRole(String token) {
        Claims claims = parseClaims(token);
        //권한 반환
        return claims.get("role", String.class);
    }

    //Claims 파싱 분석
    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //id를 통해 Authentication 객체 생성 후 반환
    public Authentication getAuthentication(Long userId) {
        CustomUserDetails userDetails = customUserDetailsService.loadUserById(userId);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }


    //로그인 실패 공통 응답 메서드
    private void writeErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write(message);
    }
}
