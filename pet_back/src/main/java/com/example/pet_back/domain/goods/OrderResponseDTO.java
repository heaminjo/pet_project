package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDTO {
    private Long order_id;
    private Long delivery_id;
    private Long member_id;
    private int total_quantity;
    private int total_price;
    private String payment;
    private Date reg_date;
    private String status;

}
