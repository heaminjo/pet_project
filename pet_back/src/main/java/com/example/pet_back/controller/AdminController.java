package com.example.pet_back.controller;

import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final MemberService memberService;

    @GetMapping("/detail")
    public ResponseEntity<?> memberDetail(@AuthenticationPrincipal CustomUserDetails userDetails) {

        return memberService.selectOne(userDetails);
    }
}
