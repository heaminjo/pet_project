package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

//회원 등급 통계
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeStatisticsDTO {
    //map <새싹회원,1> 로 받아온다.
    private Map<String, Long> userGrade;
}
