package com.example.pet_back.controller;

import com.example.pet_back.domain.address.AddressRequestDTO;
import com.example.pet_back.domain.address.AddressResponseDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.domain.member.UpdatePwRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.ImageService;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@PreAuthorize("hasRole('USER')")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class MemberController {
    private final MemberService memberService;
    private final ImageService imageService;

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
    public ResponseEntity<?> uploadImage(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam(value = "file", required = false) MultipartFile file) {

        log.info("프로필 이미지 변경 처리 실행");
        return imageService.memberUploadImage(userDetails.getMember().getId(), file);
    }

    //배송지 목록
    @GetMapping("/address/list")
    public ResponseEntity<List<AddressResponseDTO>> addressList(@AuthenticationPrincipal CustomUserDetails details) {
        log.info("배송지 목록 API 호출 ");
        return ResponseEntity.ok(memberService.addressList(details.getMember().getId()));
    }

    //배송지 추가
    @PostMapping("/address/insert")
    public ResponseEntity<?> addressInsert(@AuthenticationPrincipal CustomUserDetails details, @RequestBody AddressRequestDTO dto) {
        return memberService.addressInsert(details.getMember().getId(), dto);
    }

    //배송지 삭제
    @DeleteMapping("/address/delete")
    public ResponseEntity<ApiResponse> addressInsert(@RequestParam("addressId") Long id) {
        return ResponseEntity.ok(memberService.addressDelete(id));
    }

    //배송지 조회
    @GetMapping("/address/detail")
    public ResponseEntity<ApiResponse> addressDetail(@RequestParam("addressId") Long id) {
        return ResponseEntity.ok(memberService.addressDetail(id));
    }

    //배송지 수정
    @PutMapping("/address/update")
    public ResponseEntity<ApiResponse> addressDetail(@AuthenticationPrincipal CustomUserDetails details, @RequestBody AddressRequestDTO dto) {
        return ResponseEntity.ok(memberService.addressUpdate(details.getMember().getId(), dto));
    }
}
