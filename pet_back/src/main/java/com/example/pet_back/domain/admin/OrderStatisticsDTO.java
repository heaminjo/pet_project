package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatisticsDTO {

    //주문 통계
    private int totalPurchaseCount;  //기간별 매출 금액
    private Long totalPurchasePrice; // 기간별 주문 수
    private double avgPrice; //평균 주문 금액
    private Map<String, Long> userJoin;   //최근 7일 일일 매출 변화
}
