package com.example.pet_back.domain.login;

import com.example.pet_back.constant.GOODSSTATE;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDTO {

    private Long id;
    private Long category_id;
    private String goods_name;
    private int price;
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    private GOODSSTATE goodsstate = GOODSSTATE.SALE;
    private String image_file;
    private double rating;
    private int review_num;
    private int quantity;

}
