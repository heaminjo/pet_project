package com.example.pet_back.constant;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@Getter
// ALTER TABLE ORDERS MODIFY STATUS ENUM('BEFOREPAY', 'AFTERPAY', 'READY', 'DELIVERY', 'END');
@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum ORDERSTATE {
    BEFOREPAY,  // 결제전 (계좌이체등)
    AFTERPAY, // 결제완료
    READY, // 판매자 상품준비중
    DELIVERY, // 배송중
    END // 배송완료
}

