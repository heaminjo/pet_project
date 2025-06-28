package com.example.pet_back.domain.goods;

import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.OrderDetail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WithdrawResponseDTO {

    private Long memberId;
    private Long goodsId;
    private Long orderId;
    private Integer quantity;
    private String reason;
    private LocalDate returnDate;

     private GoodsResponseDTO goodsResponseDTO;
    private OrderDetailResponseDTO orderDetailResponseDTO;

}
