package com.example.pet_back.service;

import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    public ResponseEntity<?> login(LoginRequestDTO dto);
    public ResponseEntity<?> join(MemberRequestDTO dto);
    public ResponseEntity<Boolean> emailCheck(String email);
}