package com.example.pet_back.service.goods;

import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.admin.BestDTO;
import com.example.pet_back.domain.admin.BestInsertDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.goods.GoodsSimpleDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface GoodsService {

    // 상품 상세정보
    ResponseEntity<?> selectOne(Long goodsId);

    // 찜 (추가/해제 - 단일)
    ResponseEntity<?> favorite(Long goodsId, CustomUserDetails userDetails);

    // 찜 (가져오기 - 단일)
    ResponseEntity<?> favoriteInfo(Long goodsId, CustomUserDetails userDetails);

    // 찜 목록
    ResponseEntity<?> favorite(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO);

    // 리뷰 리스트 출력 (상품)
    ResponseEntity<?> goodsReviewList(Long goodsId, PageRequestDTO pageRequestDTO);

//    // 리뷰 리스트 출력 (상품에 대한 전체 리뷰)
//    ResponseEntity<?> showReviewList( Long goodsId,  PageRequestDTO pageRequestDTO);

    // 상품 리스트 출력 (메인)
    ResponseEntity<?> showGoodsList(PageRequestDTO pageRequestDTO);

    // 결제페이지 - 고객 주소 가져오기
    ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails);

    // 상품 등록
    void registerGoods(GoodsUploadDTO goodsUploadDTO) throws IOException;

    // 상품 수정
    void updateGoods(GoodsUploadDTO goodsUploadDTO);
        
    // 상품 삭제
    void deleteGoods(Long goodsId);

    //배너 가져오기(조해민)
    public List<BannerDTO> bannerList();

    //카테고리 목록(조해민)
    public List<CategoryResponseDTO> categoryList();

    //상품 페이징 목록(조해민)
    public PageResponseDTO<GoodsSimpleDTO> goodsPageList(PageRequestDTO dto);

    //베스트 상품 목록
    public List<BestDTO> bestList();

    //베스트 상품 추가
    public ApiResponse bestInsert(BestInsertDTO dto);

    //카테고리 추가
    public ApiResponse categoryInsert(String categoryName);

    //카테고리 삭제
    public ApiResponse categoryDelete(Long id);

    //카테고리 수정
    public ApiResponse categoryUpdate(Long id,String categoryName);

    //재고 수량 수정
    public ApiResponse quantityUpdate(Long id,int quantity);

    //재고 상태 수정
    public ApiResponse goodsStateUpdate(Long id,String state);
}
