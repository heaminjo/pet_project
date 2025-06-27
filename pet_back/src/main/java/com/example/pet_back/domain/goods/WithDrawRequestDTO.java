package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.ORDERSTATE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WithDrawRequestDTO {

    private Long memberId;
    private Long goodsId;
    private Long orderId;
    private Integer quantity;
    private ORDERSTATE reasonType; // WITHDRAW , REFUND , EXCHANGE
    private String reasonDetail;
    private LocalDate returnDate;


}
