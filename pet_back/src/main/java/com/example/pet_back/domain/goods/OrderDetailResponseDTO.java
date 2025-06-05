package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailResponseDTO {

    private Long order_detail_id;
    private Long goods_id;
    private Long order_id;
    private int goods_quantity;
    private int goods_price;
    
}
