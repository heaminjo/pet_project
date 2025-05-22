package com.example.pet_back.service;

import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    public ResponseEntity<Boolean> emailCheck(String email);
    public ResponseEntity<?> selectOne(CustomUserDetails userDetails );
}