package com.example.pet_back.controller;

import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.AuthService;
import com.example.pet_back.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@Log4j2

public class AuthController {

    //자동 주입
    private final AuthService authService;
    private final MemberService memberService;

    //회원 가입
    @PostMapping("/join")
    public ResponseEntity<?> join(@Validated @RequestBody MemberRequestDTO memberRequestDTO) {
        return ResponseEntity.ok(authService.join(memberRequestDTO));
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(response, loginRequestDTO));
    }

    //리프레쉬 토큰
    @GetMapping("/getrefresh")
    public ResponseEntity<?> getRefresh(@CookieValue("refreshToken") String refreshToken,HttpServletResponse response) {
        log.info("RefreshToken으로 토큰 재 발급 시도합니다.");
        if (refreshToken == null) {
            log.info("refreshToken이 null입니다.");
        }
        return authService.getRefresh(refreshToken,response);
    }

    //로그아웃
    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@AuthenticationPrincipal CustomUserDetails userDetails,HttpServletResponse response) {
        return ResponseEntity.ok(authService.logout(userDetails,response));
    }

    @GetMapping("/emailcheck")
    public ResponseEntity<Boolean> emailCheck(@RequestParam("email") String email) {
        log.info("이메일 중복 체크 요청된 이메일=>" + email);
        return memberService.emailCheck(email);
    }



}