package com.example.pet_back.service;

import com.example.pet_back.domain.admin.MemberStatisticsDTO;
import com.example.pet_back.domain.admin.UserStateUpdateDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import org.springframework.http.ResponseEntity;

public interface AdminService {
    //회원 검색 리스트
    public PageResponseDTO<MemberResponseDTO> memberSearchList(PageRequestDTO dto);

    //관리자의 회원 조회
    public ResponseEntity<?> adminUserDetail(String email);

    //회원 상태 변경
    public ResponseEntity<?> userStateUpdate(UserStateUpdateDTO dto);

    //회원 통계
    public MemberStatisticsDTO memberStatistics();
}
