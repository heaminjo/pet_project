package com.example.pet_back.domain.login;

import com.example.pet_back.constant.GOODSSTATE;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDTO {

    private Long goods_id;
    private Long category_id;
    private String goods_name;
    private int price;
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    private GOODSSTATE goods_state = GOODSSTATE.SALE;
    private String image_file;
    private double rating;
    private int views;
    private int review_num;
    private int quantity;
    private Date reg_date;


}
