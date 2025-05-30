package com.example.pet_back.controller;

import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
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
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final MemberService memberService;

    //관리자 조회
    @GetMapping("/detail")
    public ResponseEntity<?> memberDetail(@AuthenticationPrincipal CustomUserDetails userDetails) {

        return memberService.selectOne(userDetails);
    }

    //회원 목록 검색 리스트
    @PostMapping("/list/search")
    public ResponseEntity<PageResponseDTO<MemberResponseDTO>> memberSearchList(@RequestBody PageRequestDTO dto) {
        return ResponseEntity.ok(memberService.memberSearchList(dto));
    }

    @GetMapping("/user/detail/{email}")
    public ResponseEntity<UserDetailDTO> adminUserDetail(@RequestParam("email") String email) {
        return memberService.userDetail(email);
    }
}
