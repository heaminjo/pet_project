package com.example.pet_back.domain.login;

import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.entity.Cart;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDTO {
    private Long goods_id;
    private Long category_id;
    private String goods_name;
    private int price;
    private String description;
    private GOODSSTATE goods_state;
    private String image_file;
    private double rating;
    private int views;
    private int review_num;
    private int quantity;
    private Date reg_date;

// getter 생략
}
