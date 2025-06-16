package com.example.pet_back.service.goods;

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
    ResponseEntity<?> selectOne(Long goodsId);

    // 찜
    ResponseEntity<?> favorite(Long goodsId, CustomUserDetails userDetails);

    // 리뷰
    ResponseEntity<?> reviews(Long goodsId, PageRequestDTO pageRequestDTO);

    // 상품 리스트 출력 (메인)
    ResponseEntity<?> showGoodsList(PageRequestDTO pageRequestDTO);

    // 결제페이지 - 고객 주소 가져오기
    ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails);

    // 상품 등록
    void registerGoods(GoodsRequestDTO goodsRequestDTO) throws IOException;

    // 상품 수정
    void updateGoods(CustomUserDetails userDetails, GoodsRequestDTO goodsRequestDTO);
        
    // 상품 삭제
    void deleteGoods(CustomUserDetails userDetails, GoodsRequestDTO goodsRequestDTO);

    //배너 가져오기(조해민)
    public List<BannerDTO> bannerList();

    //카테고리 목록(조해민)
    public List<CategoryResponseDTO> categoryList();

    //상품 페이징 목록(조해민)
    public PageResponseDTO<GoodsSimpleDTO> goodsPageList(PageRequestDTO dto);

    //배너 추가
    public ApiResponse bannerInsert(BannerInsertDTO dto);

}
