package com.example.pet_back.controller;

import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.domain.member.UpdatePwRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@PreAuthorize("hasRole('USER')")
public class MemberController {
    private final MemberService memberService;


    @GetMapping("/detail")
    public ResponseEntity<?> memberDetail(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return memberService.selectOne(userDetails);
    }

    //회원 수정(이름,생일,번호)
    @PatchMapping("/update")
    public ResponseEntity<?> memberUpdate(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateMemberRequestDTO dto) {
        log.info("member update 실행");
        return memberService.memberUpdate(userDetails, dto);
    }

    //비밀번호 수정
    @PatchMapping("/pwupdate")
    public ResponseEntity<?> memberPwUpdate(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdatePwRequestDTO dto) {
        log.info("member pwupdate 실행");
        return memberService.memberPwUpdate(userDetails, dto);
    }
}
