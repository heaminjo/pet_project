package com.example.pet_back.domain.admin;

import com.example.pet_back.domain.goods.GoodsResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BannerDTO {
    private Long bannerId;
    private Long goodsId;
    private String goodsName;
    private String imageFile;
    private int position;
}
