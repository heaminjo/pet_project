package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.GOODSSTATE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class GoodsResponseDTO {

    private Long goodsId;
    private Long categoryId;
    private String goodsName;
    private int price;
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    private GOODSSTATE goodsState = GOODSSTATE.SALE;
    private String imageFile;
    private double rating;
    private int views;
    private int reviewNum;
    private int quantity;
    private LocalDate regDate;

    // 장바구니 수량
    private int cartQuantity;


    // 생성자 - 상품리스트 출력용 (메인)
    public GoodsResponseDTO(Long categoryId, String goodsName, int price, //
                            String description, GOODSSTATE goodsState, //
                            String imageFile, int quantity) {
        this.categoryId = categoryId;
        this.goodsName = goodsName;
        this.price = price;
        this.description = description;
        this.goodsState = goodsState;
        this.imageFile = imageFile;
        this.quantity = quantity;
    }


}
