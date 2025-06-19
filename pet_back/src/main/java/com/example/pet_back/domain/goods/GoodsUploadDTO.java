package com.example.pet_back.domain.goods;

import com.example.pet_back.constant.GOODSSTATE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class GoodsUploadDTO {

    private Long goodsId;
    private Long categoryId;
    private String goodsName;
    private int price;
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    private GOODSSTATE goodsState = GOODSSTATE.SALE;
    private MultipartFile imageFile;
    private int quantity;
    private LocalDate regDate;


    // 제거: private MultipartFile uploadImg;

}
