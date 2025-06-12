package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
public class BannerInsertDTO {
    private Long goodsId;
    private int position;
}
