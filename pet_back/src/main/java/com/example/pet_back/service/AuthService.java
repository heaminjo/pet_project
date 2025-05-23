package com.example.pet_back.service;

import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.login.TokenDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public ApiResponse<?> login(LoginRequestDTO dto);
    public ResponseEntity<?> join(MemberRequestDTO dto);

}
