package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.constant.ORDERSTATE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailResponseDTO {

    // Order_Detail
    private Long orderDetailId;
    private Long goodsId;
    private Long orderId;
    private int goodsQuantity; // 구매한(Order_Detail의 Quantity)
    private int goodsPrice; // 구매한(Order_Detail의 Quantity)

    // Goods <-- (goods_id) --> OrderDetail
    private String goodsName;
    private int price;
    private String description;
    private GOODSSTATE goodsState;
    private String imageFile;

    // Order <-- (order_id) --> OrderDetail
    private int totalPrice;
    private int totalQuantity;
    private LocalDate regDate;
    private String status; // Enum (BEFOREPAY, AFTERPAY, READY, DELIVERY, END, WITHDRAW, REFUND, EXCHANGE)

    // Review
    private ReviewResponseDTO reviewResponseDTO;
    private Long reviewId;
    private String score; // 별점
    private String scoreNew; // 별점
    private boolean reviewed;

}
