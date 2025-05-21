package com.example.pet_back.domain.goods;

import lombok.Data;

@Data
public class GoodsResponseDTO {
    private int goodsId;
    private String goodsName;
    private int price;
    private String imageFile;
    private String desctiption;
}