package com.example.pet_back.controller;

import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    //자동 주입
    private final MemberService memberService;

    //회원 가입
    @PostMapping("/join")
    public ResponseEntity<?> join(@Validated @RequestBody MemberRequestDTO memberRequestDTO) {
        return memberService.join(memberRequestDTO);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO){
        return memberService.login(loginRequestDTO);
    }
}