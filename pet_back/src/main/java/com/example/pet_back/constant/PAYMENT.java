package com.example.pet_back.constant;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum PAYMENT {
    CARD, // 카드결제
    CORPCARD, //법인카드
    NOACCOUNT, // 무통장입금 (계좌X)
    ACCOUNT, // 계좌이체 (계좌O)
    POINT, // 포인트결제
    PHONE, // 휴대폰결제\
}
