package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdvertiseDTO {
    // private Long bannerId;
    private Long goodsId;
    private String goodsName;
    private double rating;
    private int reviewNum;
    private String description; //설명
    private String imageFile;
    private int position;
}
