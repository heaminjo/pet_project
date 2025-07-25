package com.example.pet_back.service.goods;

import com.example.pet_back.domain.admin.GoodsRankDTO;
import com.example.pet_back.domain.goods.OrderDetailResponseDTO;
import com.example.pet_back.domain.goods.WithDrawRequestDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface OrderDetailService {

    // 회원이 주문한 OrderDetail
    ResponseEntity<?> orderList(CustomUserDetails userDetails, PageRequestDTO dto);

    //주문 상품 랭크
    List<GoodsRankDTO> goodsRank();

    // <OrderListAll />
    // 전체 OrderDetail
    PageResponseDTO<OrderDetailResponseDTO> orderDetailAllList(PageRequestDTO dto);

    // <OrderList /> : 주문취소
    ResponseEntity<?> withdraw(CustomUserDetails userDetails, WithDrawRequestDTO withDrawRequestDTO);

    // <WithDraw /> : 주문취소 내역
    ResponseEntity<?> withDrawList(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO);

//    // 리뷰 중복등록 검증
//    ResponseEntity<?> getReviewState (CustomUserDetails userDetails,Long orderDetailId);


}