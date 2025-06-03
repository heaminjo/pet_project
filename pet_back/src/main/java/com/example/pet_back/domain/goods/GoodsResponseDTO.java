package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.GOODSSTATE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class GoodsResponseDTO {

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

    // 생성자 - 상품리스트 출력용 (메인)
    public GoodsResponseDTO(Long category_id, String goods_name, int price, //
                            String description, GOODSSTATE goods_state, //
                            String image_file, int quantity) {
        this.category_id = category_id;
        this.goods_name = goods_name;
        this.price = price;
        this.description = description;
        this.goods_state = goods_state;
        this.image_file = image_file;
        this.quantity = quantity;
    }


}
