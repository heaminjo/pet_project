package com.example.pet_back.service.goods;

import com.example.pet_back.domain.admin.GoodsRankDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderDetailService {

    // 회원이 주문한 OrderDetail
    public ResponseEntity<?> orderList(CustomUserDetails userDetails, PageRequestDTO dto);
    //주문 상품 랭크
    public List<GoodsRankDTO> goodsRank();

}
