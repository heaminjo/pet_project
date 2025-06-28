package com.example.pet_back.constant;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.STRING)
// ALTER TABLE ORDERS MODIFY STATUS ENUM('BEFOREPAY', 'AFTERPAY', 'READY', 'DELIVERY', 'END'); ㅋㅋㅋㅋㅋㅋㅋ@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum ORDERSTATE {
    BEFOREPAY("결제전"),  // 결제전 (계좌이체등)
    AFTERPAY("결제완료"), // 결제완료
    READY("상품준비중"), // 판매자 상품준비중
    DELIVERY("배송중"), // 배송중
    END("배송완료"), // 배송완료
    WITHDRAW("주문취소"), // 주문취소
    REFUND("반품"), // 반품
    EXCHANGE("교환"); // 교환

    private final String orderName;

    ORDERSTATE(String orderName) {
        this.orderName = orderName;
    }

    public String getOrderName() {
        return this.orderName;
    }
}

