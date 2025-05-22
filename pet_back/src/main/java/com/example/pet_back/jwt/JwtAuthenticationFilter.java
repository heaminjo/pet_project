package com.example.pet_back.jwt;

import com.example.pet_back.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Log4j2
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;


    //필터의 핵심 로직 구현
    // HttpServletRequest request : 클라이언트가 보낸 HTTP 요청
    // HttpServletResponse response : 서버가 클라이언트에 반환할 응답
    // FilterChain filterChain :
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //request에서 토큰 가져오기
        String token = getToken(request);

    }

    //요청 시 request로 부터 토큰을 가져오는 메서드
    private String getToken(HttpServletRequest request){

        //요청 헤더 중 Authorization 값을 가져온다.
        //Authorization은 클라이언트의 요청할때의 인증 정보를 담고있음
        //보통 Bearer ????의 형태의 값이 들어있다.
        String bearerToken = request.getHeader("Authorization");

        //공백 문자열 모두 false를 해주고 값이 실제로 있는지 확인한다.
        //동시에 앞에 문자열이 Bearer로 시작하는지 확인한다.
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
            //전부 만족한다면 "Bearer "를 제외한 실제 토큰 문자열만 추출한다.
            return bearerToken.substring(7);
        }
        return null;
    }
}
