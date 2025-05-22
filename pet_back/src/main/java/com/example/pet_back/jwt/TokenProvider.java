package com.example.pet_back.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Map;

//JWT 토큰을 생성 , 파싱 ,검증하는 클래스
// JWT관련 모든 기능을 담당한다.
@Service
public class TokenProvider {
    //암호화 된 SECRETKEY 객체 생성
    //보안 강도가 높다.
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("petSecuritySecretkey0702_superkey!".getBytes());


    //토큰 생성


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
