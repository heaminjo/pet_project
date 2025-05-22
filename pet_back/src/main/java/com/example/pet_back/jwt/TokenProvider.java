package com.example.pet_back.jwt;

import com.example.pet_back.domain.login.TokenDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

//JWT 토큰을 생성 , 파싱 ,검증하는 클래스
// JWT관련 모든 기능을 담당한다.
@Service
@Log4j2
public class TokenProvider {
    //암호화 된 SECRETKEY 객체 생성
    //보안 강도가 높다.
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("petSecuritySecretkey0702_superkey!".getBytes());
    private static final String BEARER_TYPE = "Bearer"; // 토큰이 어떤 방식으로 발급되었는지
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;            // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일

    //AccessToken만 생성
    public TokenDTO createToken(Authentication authentication){

        //사용자 인증 객체에서 권한을 가져온다.
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null); //없을 경우 null

        //유효 시간 설정
        //Acc토큰의 유효시간은 생성된 시점에서 30qns로 한다


        //Jwts는 토큰 생성 보관을 지원하는 클래스이다.
        //Json 생성,서명,인코딩,디코딩,파싱등  토큰 관리 기능 제공

        //만료시간 30 분
        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

        //accessToken(사용자 정보,권한 정보,만료시간)
        String accessToken =  Jwts.builder()
                //header에 들어갈 내용 및 서명을 위한 비밀키
                //HS512 알고리즘으로 서명한다.
                .signWith(SECRET_KEY,SignatureAlgorithm.HS512)
                .claim("role",role)  //payload에 권한 저장
                .setSubject(authentication.getName()) // payload에 이메일 저장
                //토큰을 발급한 주체
                .setIssuer("몽냥마켓")
                //토큰 발급시간
                .setIssuedAt(new Date())
                //토큰 만료 시간
                .setExpiration(accessTokenExpiresIn)
                .compact();

        log.info("accessToken 생성 => ",accessToken);

        return TokenDTO.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .accessTokenExpiresln(accessTokenExpiresIn.getTime()) //만료시간
                .refreshToken(null)
                .build();
    }

    //로그인 직후 RefreshToken+Access 토큰 둘다 발급
    public TokenDTO generateTokenDto(Authentication authentication){

        //사용자 인증 객체에서 권한을 가져온다.
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null); //없을 경우 null


        long now = (new Date()).getTime();

        //AccessToken 생성
        //만료시간 30분
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken =  Jwts.builder()
                .signWith(SECRET_KEY,SignatureAlgorithm.HS512)
                .claim("role",role)  //payload에 권한 저장
                .setSubject(authentication.getName()) // payload에 이메일 저장
                .setIssuer("몽냥마켓")
                .setIssuedAt(new Date())
                .setExpiration(accessTokenExpiresIn)
                .compact();

        //RefreshToken 생성
        //만료 기간 7일
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        String refreshToken = Jwts.builder()
                .setExpiration(refreshTokenExpiresIn)
                .signWith(SECRET_KEY,SignatureAlgorithm.HS512)
                .compact();

        return TokenDTO.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .accessTokenExpiresln(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }


    //전달 받은 토큰 검증
    //Claim 정보 (사용자 정보, 만료 시간 등)을 추출해서 Map<String,Object> 형태로 반환
    public Map<String,Object> validateToken(String token){
        //Jwts.parser() : JWT를 파싱(해석) 하기 위한 객체 (체인형식)
        //setSingningKey(SECRET_KEY) : 토큰 서명을 검증하기 위한 비밀키
        //      토큰을 생성할 때 사용한 키와 동일해야한다.
        return Jwts.parser()
                .setSigningKey(SECRET_KEY).build()
                //전달받은 JWT 문자열을 파싱해서 Claims객체로 변환
                //유효하지 않은 토큰일 경우 Exception이 발생
                .parseClaimsJws(token)
                //JWT에 Claims영역을 가져온다. 반환타입은 Map
                .getBody();
    }
}
