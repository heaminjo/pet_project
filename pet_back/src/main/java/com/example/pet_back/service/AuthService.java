package com.example.pet_back.service;

import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public ApiResponse<?> login(HttpServletResponse response, LoginRequestDTO dto);

    public ResponseEntity<?> join(MemberRequestDTO dto);
    //리프레쉬로 토큰 재발급
    public ResponseEntity<?> getRefresh(String refreshToken,HttpServletResponse response);

    public ApiResponse logout(CustomUserDetails userDetails,HttpServletResponse response);
}
