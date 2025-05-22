package com.example.pet_back.jwt;

import com.example.pet_back.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;

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

        try{
        //request에서 토큰 가져오기
        String token = getToken(request);

        log.info("토큰 정보 확인 => "+token);

        //토큰이 존재할 경우
        if(token != null  && !token.equalsIgnoreCase("null")) {

            //토큰 검증 , claims 가져오기
            Map<String, Object> claims = tokenProvider.validateToken(token);
            log.info("토큰 Claims 사용자정보 만료시간 => " + claims);

            //토큰에 사용자 정보에서 userId를 가져온다
            String userId = (String) claims.get("userId");

            //유저 권한 가져오기(USER or ADMIN)
            String role = (String) claims.get("role");

            //인증 객체 수동 생성
            //AbstractAuthenticationToken 인증을 구현한 클래스
            //유저의 정보와 권한이 들어간다.
            AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userId,  //요청한 주체 (Principal)
                    null,  //일반적으로 비밀번호가 들어가지만 JWT은 토큰 자체가 인증 수단이므로 null로 처리한다.
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)) //role은 단일값
            );

            //authenticationToken 객체에 부가 정보를 담아준다.
            //단순히 사용자ID와 권한정보 이외에도 접속 IP 주소 , 세션Id등을 저장할 수 있다.
            //setDetails에 저장
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // 빈 SecurityContext 객체를 생성한다
            //SecurityContextHolder 로 부터 생성
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            //검증 결과로 생성된 인증 정보를 저장
            context.setAuthentication(authenticationToken);
            //최종적으로 현재 요청에 Context를 설정
            // 이후 컨트롤러나 서비스에서 인증된 사용자로 인식
            SecurityContextHolder.setContext(context);
        }
        }catch (Exception e){
            log.info("사용자 인증 과정 중 에러 발생 => "+e.toString());
        }
        //최종 서블릿으로 요청과 응답을 넘김
        filterChain.doFilter(request,response);
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

        //없다면 현재 아무런 정보가 없는 상태 (새 토큰 발행 필요)
        return null;
    }
}
