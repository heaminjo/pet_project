package com.example.pet_back.controller;

import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.login.TokenDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    //자동 주입
    private final AuthService authService;

    //회원 가입
    @PostMapping("/join")
    public ResponseEntity<?> join(@Validated @RequestBody MemberRequestDTO memberRequestDTO) {
        return ResponseEntity.ok(authService.join(memberRequestDTO));
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO, HttpServletResponse response){
        return ResponseEntity.ok(authService.login(response,loginRequestDTO));
    }

    //리프레쉬 토큰
    @GetMapping("/getrefresh")
    public ResponseEntity<?>getRefresh(@CookieValue(value = "refreshToken", required = false) String refreshToken){
        return authService.getRefresh(refreshToken);
    }
}