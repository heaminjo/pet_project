package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//관리자 페이지 회원 통계
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberStatisticsDTO {
    private Long totalUser; //전체회원수
    private Long newUser; //신규 가입 회원 수
    private Long todayUser; //오늘 로그인한 유저

}
