package com.example.pet_back.service.goods;

import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.goods.ReviewRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {

    // 결제페이지 - 고객 주소 가져오기
    public ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails);

    // 상품 결제
    ResponseEntity<?> payGoods(CustomUserDetails userDetails, PayRequestDTO dto);

    // 리뷰 작성
    ResponseEntity<?> regReview(CustomUserDetails userDetails, ReviewRequestDTO dto);



}
