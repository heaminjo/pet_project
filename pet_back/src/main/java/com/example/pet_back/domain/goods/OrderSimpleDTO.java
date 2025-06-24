package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.constant.PAYMENT;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

// 조회용 <DeliveryGoods />
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderSimpleDTO {
    // 주문일자, 가격, 주문수량, 결제수단, 주문상태
    private Long orderId;
    private Long memberId;
    private Long deliveryId;
    private LocalDate regDate;
    private int totalPrice;
    private int totalQuantity;
    private PAYMENT payment;
    private ORDERSTATE status;

}
