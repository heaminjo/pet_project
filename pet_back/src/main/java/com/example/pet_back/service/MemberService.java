package com.example.pet_back.service;

import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.domain.member.UpdatePwRequestDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    public ResponseEntity<Boolean> emailCheck(String email);

    public ResponseEntity<?> selectOne(CustomUserDetails userDetails);

    public ResponseEntity<?> memberUpdate(CustomUserDetails userDetails, UpdateMemberRequestDTO dto);

    public ResponseEntity<?> memberPwUpdate(CustomUserDetails userDetails, UpdatePwRequestDTO dto);

//    public List<MemberResponseDTO> memberList();

    //멤버 리스트
    public PageResponseDTO<MemberResponseDTO> memberSearchList(PageRequestDTO dto);

    public ResponseEntity<?> adminUserDetail(String email);
}