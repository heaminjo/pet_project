package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//회원 등급 통계
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeStatisticsDTO {
    //map <새싹회원,1> 로 받아온다.
//    private Map<String, Long> userGrade;
    private Long userNum;   //등급 별 유저 수
    private double avgPoint; //평균포인트
    private double percent; //비율


}
