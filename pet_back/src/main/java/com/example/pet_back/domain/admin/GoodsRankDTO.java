package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class GoodsRankDTO {
    private Long goodsId;
    private String goodsName;
    private Long totalPurchaseCount;  //판매수량
    private Long totalPurchasePrice;  //매출액
}
