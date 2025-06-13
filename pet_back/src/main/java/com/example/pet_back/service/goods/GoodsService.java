package com.example.pet_back.service.goods;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface GoodsService {

    // 상품 상세정보
    ResponseEntity<?> selectOne(Long goods_id);

    // 찜
    ResponseEntity<?> favorite(Long goods_id, CustomUserDetails userDetails);

    // 상품 리스트 출력 (메인)
    ResponseEntity<?> showGoodsList();

    // 상품 등록
    void registerGoods(GoodsRequestDTO goodsRequestDTO, MultipartFile uploadImg, HttpServletRequest request) throws IOException;

    // 상품 수정
    void updateGoods(CustomUserDetails userDetails, GoodsRequestDTO goodsRequestDTO);
        
    // 상품 삭제
    void deleteGoods(CustomUserDetails userDetails, GoodsRequestDTO goodsRequestDTO);


}
