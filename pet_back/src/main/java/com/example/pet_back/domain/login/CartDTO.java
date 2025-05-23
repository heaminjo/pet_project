package com.example.pet_back.domain.login;

import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {

    private int member_id;
    private int goods_id;
    private int quantity;

}
