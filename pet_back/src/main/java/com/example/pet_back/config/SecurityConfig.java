package com.example.pet_back.config;


import com.example.pet_back.jwt.CustomUserDetailsService;
import com.example.pet_back.jwt.JwtAuthenticationFilter;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

//SecurityConfig
//어플리케이션의 보안 관련 설정들을 커스텀하고 관리하기 위한 설정파일
//인증과 인가에 대한 설정
//보안 필터를 설정
//비밀번호 암호화 설정

//설정파일 명시
@Configuration
//스프링 시큐리티를 활성화 하고 웹 보안 구성을 설정
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final CustomUserDetailsService customUserDetailsService;


    //필터를 받아 권한에 따른 페이지 허용
    //HttpSecurity는 웹 보안 설정을 구성하는데 사용되며 여러 보안필터,권한설정,인증방식등을 설정
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //필터를 등록 한다.
        //addFilterBefore() : HttpSecurity에서 제공하는 메서드로 인자로 주어진 필터를 체인에 beforeFilter라는 클래스 바로앞에 삽입
        http.addFilterBefore((Filter) jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        //jwtAuthenticationFilter: JWT 인증용 커스텀 필터, 유효성 검사,토큰 기반 인증 처리
        // UsernamePasswordAuthenticationFilter.class : 스프링 시큐리티 기본 필터 (폼 로그인 시 사용자 이름과 비밀번호를 받아 인증
        // Before하는 이유는 JWT 인증 필터가 먼저 실행되도록 하기 위함

        //동작 순서 정리
        //1. jwtAuthenticationFilter(jwt 인증 필터)가 먼저 실행 후 요청 헤더의 JWT 토큰 검사 후 인증 객체 생성 혹은 실패 처리
        //2. 그 다음 UsernamePasswordAuthenticationFilter 가 실행 되어 로그인을 처리
        //3. 만약 JWT 토큰이 유효할 경우 이 후 필터는 이미 인증된 상태로 요청 처리(로그인 유지의 경우)


        //http의 기본 설정들 비활성화
        // httpBasic: 요청마다 사용자 아이디와 비밀번호를 헤더에 담아 보내느 방식. jwt는 해당 방식을 안쓴다.
        // formLogin : 기본 로그인 폼을 비활성화 jwt는 토큰을 헤더에 담아 보내므로 스프링이 제공하는 폼 로그인 UI가 필요없다.
        // logout : 기본 로그아웃 기능을 비활성화 jwt는 세션이 없고 토큰 자체가 인증 수단으로 토큰을 삭제하는 방식으로 처리
        // csrf : CSRF 보호 기능 비활성화 jwt는 무상태이며 토큰을 헤더에 넣어보내 CSRF 공격 위험이 적다
        // cors : Cors 설정은 기본 활성화 클라이언트에서 다른 도메인으로 요창할때 CORS 정책에 맞춰야한다.
        // sessionManagement: 세션을 아예 만들지 않고 서버에 세션 정보를 저장하지 않겠다는 의미 jwt는 서버가 상태를 저장하지 않는 인증 방식이며
        //      세션을 사용하지 않고 요청마다 JWT 토큰으로 인증
        return http.httpBasic(httpBasic -> httpBasic.disable()) // HTTP 기본 인증 비활성화
                .formLogin(formLogin -> formLogin.disable()) // formLogin 비활성화
                .logout(logout -> logout.disable()) // logout 비활성화
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .cors(cors -> {
                }) // CORS설정 활성화(기본값)_필수항목
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 비활성화 (무상태)

//인가 설정 경로 별로 권한에 따른 설정
                .authorizeHttpRequests(auth -> auth
                        //관리자와 회원의 경로가 나올때마다 즉시 추가
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasRole("USER")
                        .requestMatchers("/goods/**").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        //OPTIONS 메서드로 들어오는 모든 요청을 인증없이 허용
                        //프론트엔드가 API 요청 전 보내는 CORS 사전 확인 요청을 막지 않기 위해
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().permitAll())
                //설정하지 않은 모든 도메인 요청을 허용 (즉 누구나 접근 가능
                .build();
    }


    //비밀번호 암호화 BCryptPasswordEncoder 알고리즘 사용
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //회원 DB조회를 위한 설정
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder) throws Exception {
        AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
        builder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder);
        return builder.build();
    }
}
