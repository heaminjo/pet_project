package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PaymentPreviewDTO {
    private int goodsPrice;
    private int deliveryPrice;
    private int disCount;
    private int finalPrice;
    private String grade;
}
