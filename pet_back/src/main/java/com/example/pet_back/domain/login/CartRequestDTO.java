package com.example.pet_back.domain.login;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartRequestDTO {

    // Cart
    private Long member_id;
    private Long goods_id;
    private int quantity;

}
