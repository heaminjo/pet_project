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
import org.springframework.web.multipart.MultipartFile;

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

    //회원 탈퇴
    @GetMapping("/withdrawal")
    public ResponseEntity<?> memberWithdrawal(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("멤버 탈퇴 처리 실행");
        return memberService.memberWithdrawal(userDetails.getMember().getId());
    }

    //프로필 이미지 변경
    @PostMapping("/uploadimage")
    public ResponseEntity<?> uploadImage(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam("file") MultipartFile file) {
        log.info("프로필 이미지 변경 처리 실행");
        return memberService.memberUploadImage(userDetails.getMember().getId(), file);

    }
}
