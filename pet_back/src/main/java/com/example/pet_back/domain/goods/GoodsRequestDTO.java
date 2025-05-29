package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.GOODSSTATE;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoodsRequestDTO {

    private Long goods_id;
    private Long category_id;
    private String goods_name;
    private int price;
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    private GOODSSTATE goods_state = GOODSSTATE.SALE;
    private String image_file;
    private int quantity;
    private Date reg_date;


}
