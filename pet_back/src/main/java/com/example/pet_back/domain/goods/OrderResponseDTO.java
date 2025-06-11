package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDTO {
    private Long orderId;
    private Long deliveryId;
    private Long memberId;
    private int totalQuantity;
    private int totalPrice;
    private String payment;
    private LocalDate regDate;
    private String status;

}
