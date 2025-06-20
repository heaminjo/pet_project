package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

//관리자 페이지 회원 통계
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberStatisticsDTO {
    private Long totalUser; //전체회원수
    private Long newUser; //신규 가입 회원 수
    private Long todayUser; //오늘 로그인한 유저
    private Long male; //남자 수
    private Long female;//여자 수
    private Map<String, Long> userJoin;




}
