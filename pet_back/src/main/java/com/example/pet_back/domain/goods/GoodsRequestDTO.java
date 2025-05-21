package com.example.pet_back.domain.goods;

import lombok.Data;

@Data
public class GoodsRequestDTO {
    private int categoryId;
    private String goodsName;
    private int price;
    private String desctiption;
    private String imageFile;
    private int quantity;
}
