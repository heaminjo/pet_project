package com.example.pet_back.service;

import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.admin.BannerInsertDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.CategoryResponseDTO;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsSimpleDTO;
import com.example.pet_back.domain.goods.GoodsSimpleDTO;
import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface GoodsService {

    // 상품 상세정보
    public ResponseEntity<?> selectOne(Long goods_id);

    // 상품 리스트 출력 (메인)
    ResponseEntity<?> showGoodsList();

    // 상품 등록
    void registerGoods(GoodsRequestDTO goodsRequestDTO, MultipartFile uploadImg, HttpServletRequest request) throws IOException;

    // 상품 결제
    ResponseEntity<?> payGoods(CustomUserDetails userDetails, PayRequestDTO dto);

    // 주문 리스트
    ResponseEntity<?> orderList(CustomUserDetails userDetails);

    // 특정 고객이 한번이라도 주문한 적 있는 상품의 리스트
    public ResponseEntity<?> customerGoodsHistory(CustomUserDetails userDetails, List<Long> orderIdList);

    // 결제페이지 - 고객 주소 가져오기
    public ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails);

    //배너 가져오기(조해민)
    public List<BannerDTO> bannerList();

    //카테고리 목록(조해민)
    public List<CategoryResponseDTO> categoryList();

    //상품 페이징 목록(조해민)
    public PageResponseDTO<GoodsSimpleDTO> goodsPageList(PageRequestDTO dto);

    //배너 추가
    public ApiResponse bannerInsert(BannerInsertDTO dto);
}
