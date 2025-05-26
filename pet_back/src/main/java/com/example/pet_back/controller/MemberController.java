package com.example.pet_back.controller;

import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/emailcheck")
    public ResponseEntity<Boolean> emailCheck(@RequestParam("email") String email){
        log.info("이메일 중복 체크 요청된 이메일=>"+email);
        return memberService.emailCheck(email);
    }

    @GetMapping("/detail")
    public ResponseEntity<?> memberDetail(@AuthenticationPrincipal CustomUserDetails userDetails){
        return memberService.selectOne(userDetails);
    }
}
