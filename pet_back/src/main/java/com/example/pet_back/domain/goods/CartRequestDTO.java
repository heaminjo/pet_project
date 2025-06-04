package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartRequestDTO {

    // Cart
    private Long member_id;
    private Long goods_id;


}
