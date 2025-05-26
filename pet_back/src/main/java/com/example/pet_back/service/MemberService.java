package com.example.pet_back.service;

import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface MemberService {
    public ResponseEntity<Boolean> emailCheck(String email);
    public ResponseEntity<?> selectOne(CustomUserDetails userDetails );
    public ResponseEntity<?> memberUpdate(CustomUserDetails userDetails, UpdateMemberRequestDTO dto);
}