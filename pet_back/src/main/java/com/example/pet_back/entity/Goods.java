package com.example.pet_back.entity;

import lombok.Data;

@Data
public class Goods {
    private int goodsId;
    private int categoryId;
    private String goodsName;
    private int price;
    private String desctiption;
    private String goodsState;
    private String imageFile;
    private double rating;
    private int views;
    private int reviewNum;
    private int quantity;
    private String regDate;
}
