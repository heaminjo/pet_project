package com.example.pet_back.controller;

import com.example.pet_back.domain.admin.GradeStatisticsDTO;
import com.example.pet_back.domain.admin.MemberStatisticsDTO;
import com.example.pet_back.domain.admin.UserStateUpdateDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.AdminService;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final MemberService memberService;
    private final AdminService adminService;

    //관리자 조회
    @GetMapping("/detail")
    public ResponseEntity<?> memberDetail(@AuthenticationPrincipal CustomUserDetails userDetails) {

        return memberService.selectOne(userDetails);
    }

    //회원 목록 검색 리스트
    @PostMapping("/list/search")
    public ResponseEntity<PageResponseDTO<MemberResponseDTO>> memberSearchList(@RequestBody PageRequestDTO dto) {
        return ResponseEntity.ok(adminService.memberSearchList(dto));
    }

    //회원 상세조회
    @GetMapping("/user/detail")
    public ResponseEntity<?> adminUserDetail(@RequestParam("email") String email) {
        return adminService.adminUserDetail(email);
    }

    //회원 상태 변경
    @PostMapping("/user/state/update")
    public ResponseEntity<?> userStateUpdate(@RequestBody UserStateUpdateDTO dto) {
        return adminService.userStateUpdate(dto);
    }

    //통계
    @GetMapping("/statistics")
    public ResponseEntity<MemberStatisticsDTO> memberStatistics() {
        return ResponseEntity.ok(adminService.memberStatistics());
    }

    @GetMapping("/statistics/grade")
    public ResponseEntity<Map<String, GradeStatisticsDTO>> gradeStatistics() {
        return ResponseEntity.ok(adminService.gradeStatistics());
    }
}
