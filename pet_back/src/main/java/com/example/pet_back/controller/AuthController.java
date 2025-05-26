package com.example.pet_back.controller;

import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.login.TokenDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
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
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO){
        return ResponseEntity.ok(authService.login(loginRequestDTO));
    }
}