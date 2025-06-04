package com.example.pet_back.service;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.jwt.CustomUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface GoodsService {

    // 상품 상세정보
    public ResponseEntity<?> selectOne(Long goods_id);

    // 상품 리스트 출력 (메인)
    ResponseEntity<?> showGoodsList();

    // 상품 등록
    void registerGoods(GoodsRequestDTO goodsRequestDTO, HttpServletRequest request) throws IOException;

    // 상품 결제
    ResponseEntity<?> payGoods(CustomUserDetails userDetails, PayRequestDTO dto);

    // 주문 리스트
    ResponseEntity<?> orderList(CustomUserDetails userDetails, List<OrderDetail> orderDetailList);

}
