package com.example.pet_back.service;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

public interface CartService {
    // 장바구니 리스트 출력
    public ResponseEntity<?> selectList(CustomUserDetails userDetails);

    // 상품을 장바구니에 추가
    public ResponseEntity<?> addToCart(CustomUserDetails userDetails, GoodsRequestDTO goodsRequestDTO);
}
