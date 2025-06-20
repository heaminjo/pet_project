package com.example.pet_back.service;

import com.example.pet_back.domain.admin.*;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface AdminService {
    //회원 검색 리스트
    public PageResponseDTO<MemberResponseDTO> memberSearchList(PageRequestDTO dto);

    //관리자의 회원 조회
    public ResponseEntity<?> adminUserDetail(String email);

    //회원 상태 변경
    public ResponseEntity<?> userStateUpdate(UserStateUpdateDTO dto);

    //회원 통계
    public MemberStatisticsDTO memberStatistics();

    //등급 통계
    public Map<String, GradeStatisticsDTO> gradeStatistics();

    //각 등급 당 우수 회원
    public List<MemberResponseDTO> userBestList(String grade);

    //등급 업그레이드
    public ApiResponse upgradeGrade(UpgradeRequstDTO dto);

    //배너 삭제
    public ApiResponse bannerDelete(Long id);
    //베스트 삭제
    public ApiResponse bestDelete(Long id);
}
