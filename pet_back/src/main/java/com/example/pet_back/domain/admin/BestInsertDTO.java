package com.example.pet_back.domain.admin;

//베스트 상품 추가 DTO

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BestInsertDTO {
    private Long goodsId;
    private int position;
}
