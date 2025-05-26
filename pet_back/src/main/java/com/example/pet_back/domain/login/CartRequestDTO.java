package com.example.pet_back.domain.login;

import com.example.pet_back.constant.GOODSSTATE;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartRequestDTO {
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
}
