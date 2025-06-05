package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.constant.ORDERSTATE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailResponseDTO {

    // Order_Detail
    private Long order_detail_id;
    private Long goods_id;
    private Long order_id;
    private int goods_quantity; // 구매한(Order_Detail의 Quantity)
    private int goods_price; // 구매한(Order_Detail의 Quantity)

    // Goods <-- (goods_id) --> OrderDetail
    private String goods_name;
    private int price;
    private String description;
    private GOODSSTATE goodsstate;
    private String image_file;

    // Order <-- (order_id) --> OrderDetail
    private int total_price;
    private int total_quantity;
    private Date reg_date;
    private ORDERSTATE status;


}
