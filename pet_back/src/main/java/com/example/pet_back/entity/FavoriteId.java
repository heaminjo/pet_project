package com.example.pet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteId {
    private static final long serialVersionUID = 1L;

    private Long memberId;
    private Long goodsId;

}
