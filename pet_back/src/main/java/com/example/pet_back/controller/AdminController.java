package com.example.pet_back.controller;

import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @GetMapping("/list/all")
    public ResponseEntity<List<MemberResponseDTO>> memberList() {
        return ResponseEntity.ok(memberService.memberList());
    }

    @GetMapping("/list/search")
    public ResponseEntity<List<MemberResponseDTO>> memberSearchList(@RequestParam("type") String type, @RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(memberService.memberSearchList(type, keyword));
    }
}
