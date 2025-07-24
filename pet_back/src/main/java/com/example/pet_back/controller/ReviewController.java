package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import com.example.pet_back.service.goods.OrderDetailService;
import com.example.pet_back.service.goods.OrderService;
import com.example.pet_back.service.goods.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/review")
@RestController
@CrossOrigin(origins = {
        "http://13.209.222.217",
        "http://13.209.222.217:3000",
        "http://13.209.222.217:8080",
        "http://localhost:3000",
        "http://localhost:8080"
}, allowCredentials = "true")
public class ReviewController {

    private final OrderService orderService;
    private final ReviewService reviewService;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리 뷰 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 리뷰 업로드
    @PostMapping("/register")
    public ResponseEntity<?> regReview(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                       @RequestPart("review") ReviewUploadDTO reviewUploadDTO,
                                       @RequestPart(value = "imageFile", required = false) List<MultipartFile> imageFiles) {
        log.info("** OrderController => regReview() 실행됨 **");
        try {
            reviewUploadDTO.setImageFiles(imageFiles);
            log.info("** OrderController =>  reviewUploadDTO.setImageFile(imageFile) **");
            return reviewService.regReview(userDetails, reviewUploadDTO);
        } catch (Exception e) {
            log.error("** OrderController.regReview Exception => " + e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
        }
    }

    // 리뷰 삭제
    @GetMapping("/delete/{reviewId}")
    public ResponseEntity<?> deleteReview( @PathVariable Long reviewId){
        log.info("** OrderController => deleteReview() 실행됨 **");
        return reviewService.deleteReview( reviewId);
    }

    // 내 리뷰 목록 출력
    @PostMapping("/my")
    public ResponseEntity<?> showReviewList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** OrderController => showReviewList() 실행됨 **");
        return reviewService.showMyReviews(userDetails, pageRequestDTO);
    }


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리 뷰 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 리뷰 리스트 출력 (상품)
    @GetMapping("/{goodsId}")
    public ResponseEntity<?> goodsReviewList(@PathVariable Long goodsId, @ModelAttribute PageRequestDTO pageRequestDTO) {
        log.info("** GoodsController => goodsReviewList() 실행됨 **");
        return reviewService.goodsReviewList(goodsId, pageRequestDTO);
    }
//
//    // 리뷰 수정
//    @PostMapping("/update")
//    public ResponseEntity<?> updateReview(@AuthenticationPrincipal CustomUserDetails userDetails, //
//                                       @RequestPart("review") ReviewUploadDTO reviewUploadDTO,
//                                       @RequestPart(value = "imageFile", required = false) List<MultipartFile> imageFiles) {
//        log.info("** OrderController => updateReview() 실행됨 **");
//        try {
//            reviewUploadDTO.setImageFiles(imageFiles);
//            log.info("** OrderController =>  reviewUploadDTO.setImageFile(imageFile) **");
//            return orderService.updateReview(userDetails, reviewUploadDTO);
//        } catch (Exception e) {
//            log.error("** OrderController.updateReview Exception => " + e.toString());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
//        }
//    }


//    // 리뷰 중복등록 여부 검증
//    @GetMapping("/state/{orderDetailId}")
//    public ResponseEntity<?> getReviewState(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long orderDetailId){
//        log.info("** OrderController => getReviewState() 실행됨 **");
//        return orderDetailService.getReviewState(userDetails, orderDetailId);
//    }


}
