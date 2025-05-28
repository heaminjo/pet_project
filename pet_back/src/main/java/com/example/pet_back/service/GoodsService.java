package com.example.pet_back.service;

import com.example.pet_back.domain.login.GoodsRequestDTO;
import org.springframework.http.ResponseEntity;

public interface GoodsService {

    // 상품리스트 출력 (메인)
    ResponseEntity<?> showGoodsList();

    // 상품등록
    void registerGoods(GoodsRequestDTO goodsRequestDTO);

}
