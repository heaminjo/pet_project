package com.example.pet_back.domain.login;

import com.example.pet_back.constant.GOODSSTATE;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class GoodsRequestDTO {

    private Long category_id;
    private String goods_name;
    private int price;
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    private GOODSSTATE goods_state = GOODSSTATE.SALE;
    private String image_file;
    private int quantity;
    private Date reg_date;

    // 생성자
    // INSERT INTO GOODS(category_id, goods_name, price, desctiption, quantity) VALUES ('5', '사료', 10000, '유기농 사료', 1);
    public GoodsRequestDTO(Long category_id, String goods_name, int price, //
                           String description, GOODSSTATE goods_state, //
                           String image_file, int quantity, Date reg_date) {

        this.category_id = category_id;
        this.goods_name = goods_name;
        this.price = price;
        this.description = description;
        this.goods_state = goods_state;
        this.image_file = image_file;
        this.quantity = quantity;
        this.reg_date = reg_date;

    }

}
