package com.example.pet_back.domain.admin;


import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//베스트 상품 출력 DTO
public class BestDTO {
    private Long bestId;
    private Long goodsId;
    private String categoryName;
    private String goodsName;
    private String description; //설명
    private String imageFile;
    private int position;
}
