package com.example.pet_back.service.goods;

import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.domain.admin.OrderStatisticsDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.OrderResponseDTO;
import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface OrderService {

    // 결제페이지 - 고객 주소 가져오기
    public ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails);

    // 결제시 할인율 계산, 결제금액 Preview (백엔드 일괄)
    PaymentPreviewDTO calculatePaymentPreview(List<Map<String, Object>> goodsList, CustomUserDetails userDetails);

    // 상품 결제
    ResponseEntity<?> payGoods(CustomUserDetails userDetails, PayRequestDTO dto);

    // 배송조회
    ORDERSTATE deliveryStatus(CustomUserDetails userDetails, Long orderDetailId);

    // 리뷰 작성
    ResponseEntity<?> regReview(CustomUserDetails userDetails, ReviewUploadDTO dto) throws IOException;

    // 리뷰 삭제
    ResponseEntity<?> deleteReview(Long reviewId);
    
    // 내 리뷰 목록 출력
    ResponseEntity<?> showMyReviews(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO);

    //주문 통계
    OrderStatisticsDTO orderStatistics (String date);

    // 주문 리스트
    List<OrderResponseDTO> userOrderList(Long userId);

    // [관리자] 주문 전체 리스트
    ResponseEntity<?> orderAllList(PageRequestDTO pageRequestDTO);

    // [관리자] <DeliveryGoods />
    PageResponseDTO<OrderSimpleDTO> ordersPageList(PageRequestDTO dto);

    // [관리자] 주문 상태 수정
    ApiResponse orderStateUpdate(Long id, String state);
}
