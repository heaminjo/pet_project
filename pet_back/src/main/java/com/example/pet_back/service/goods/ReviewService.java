package com.example.pet_back.service.goods;

import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface ReviewService {

    // 리뷰 작성
    ResponseEntity<?> regReview(CustomUserDetails userDetails, ReviewUploadDTO dto) throws IOException;

    // 리뷰 수정
//    ResponseEntity<?> updateReview(CustomUserDetails userDetails, //
//                                          ReviewUploadDTO reviewUploadDTO) throws IOException;
    // 리뷰 삭제
    ResponseEntity<?> deleteReview(Long reviewId);

    // 내 리뷰 목록 출력
    ResponseEntity<?> showMyReviews(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO);

    // 리뷰 리스트 출력 (상품)
    ResponseEntity<?> goodsReviewList(Long goodsId, PageRequestDTO pageRequestDTO);

//    // 리뷰 리스트 출력 (상품에 대한 전체 리뷰)
//    ResponseEntity<?> showReviewList( Long goodsId,  PageRequestDTO pageRequestDTO);

}
