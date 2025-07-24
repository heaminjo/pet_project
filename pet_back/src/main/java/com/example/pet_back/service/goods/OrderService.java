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


    // 배송조회
    ORDERSTATE deliveryStatus(CustomUserDetails userDetails, Long orderDetailId);

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
