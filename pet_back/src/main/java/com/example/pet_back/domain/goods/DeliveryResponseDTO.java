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
    private Long delivery_id;
    private Long member_id;
    private Long address_id;
    private String recipient;
    private String delivery_name;
    private String recipient_phone;
    private String request_message;
}
