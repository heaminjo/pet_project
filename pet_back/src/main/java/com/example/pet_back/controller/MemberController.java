package com.example.pet_back.controller;

import com.example.pet.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/emailcheck")
    public ResponseEntity<Boolean> emailCheck(@RequestParam("email") String email){
        log.info("이메일 중복 체크 요청된 이메일=>"+email);
        return memberService.emailCheck(email);
    }
}
