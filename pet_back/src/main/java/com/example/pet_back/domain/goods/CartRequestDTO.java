package com.example.pet_back.domain.goods;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class CartRequestDTO {

    // Cart
    private Long member_id;

    public CartRequestDTO(Long member_id) {
        this.member_id = member_id;
    }

    // private GoodsRequestDTO goods;
    // private MemberRequestDTO member;


}
