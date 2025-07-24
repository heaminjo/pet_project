package com.example.pet_back.service.goods;

import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.goods.PaymentPreviewDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface PayService {

    // 결제페이지 - 고객 주소 가져오기
    ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails);

    // 결제시 할인율 계산, 결제금액 Preview (백엔드 일괄)
    PaymentPreviewDTO calculatePaymentPreview(List<Map<String, Object>> goodsList, CustomUserDetails userDetails);

    // 상품 결제
    ResponseEntity<?> payGoods(CustomUserDetails userDetails, PayRequestDTO dto);


}
