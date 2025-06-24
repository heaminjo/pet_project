package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

// 조회용
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailSimpleDTO {

    private Long orderId;
    private String imageFile;
    private String goodsName;
    private String description;
    private int price;
    private int orderQuantity;

    private LocalDate regDate;

    private String status; // enum


}
