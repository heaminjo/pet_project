package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.PAYMENT;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayRequestDTO {
    private List<GoodsRequestDTO> goodsList;
    private PAYMENT payment;
    // 배송정보
    String deliveryName;
    String requestMessage;
    Long addressId;

}
