package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//상품 썸네일용 DTO(조해민)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoodsSimpleDTO {
    private Long goodsId;
    private String goodsName;
    private String imageFile;
    private String categoryName;
    private double rating;
    private int reviewNum;
    private int price;
}
