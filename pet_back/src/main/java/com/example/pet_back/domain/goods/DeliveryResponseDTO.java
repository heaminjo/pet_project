package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryResponseDTO {
    private Long deliveryId;
    private Long memberId;
    private Long addressId;
    private String recipient;
    private String deliveryName;
    private String recipientPhone;
    private String requestMessage;
}
