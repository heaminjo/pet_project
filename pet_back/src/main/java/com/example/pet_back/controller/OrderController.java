package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import com.example.pet_back.service.goods.OrderDetailService;
import com.example.pet_back.service.goods.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/order")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final MemberService memberService;
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;

    // <OrderDetail /> : 주문 리스트
    @PostMapping("/detail")
    public ResponseEntity<?> orderList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** OrderController => orderList() 실행됨 **");
        return orderDetailService.orderList(userDetails, pageRequestDTO);
    }

    // 고객 주소 가져오기
    @GetMapping("/findaddress")
    public ResponseEntity<?> findMemberAddress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** OrderController => findMemberAddress() 실행됨 **");
        return orderService.findMemberAddress(userDetails);
    }

    // 결제 메서드
    @PostMapping("/pay")
    public ResponseEntity<?> payGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                      @RequestBody PayRequestDTO dto) {
        log.info("** OrderController => payGoods() 실행됨 **");
        log.info("결제 user = " + userDetails.getMember().getEmail()); // 이게 null?
        return orderService.payGoods(userDetails, dto);
    }

    // 리뷰 업로드
    @PostMapping("/review/register")
    public ResponseEntity<?> regReview(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                       @RequestPart("review") ReviewUploadDTO reviewUploadDTO,
                                       @RequestPart(value = "imageFile", required = false) List<MultipartFile> imageFiles) {
        log.info("** OrderController => regReview() 실행됨 **");
        try {
            reviewUploadDTO.setImageFiles(imageFiles);
            log.info("** OrderController =>  reviewUploadDTO.setImageFile(imageFile) **");
            return orderService.regReview(userDetails, reviewUploadDTO);
        } catch (Exception e) {
            log.error("** goodsService.registerGoods Exception => " + e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
        }
    }

    // 내 리뷰 목록 출력
    @PostMapping("/myreviews")
    public ResponseEntity<?> showReviewList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** GoodsController => reviews() 실행됨 **");
        return orderService.showMyReviews(userDetails, pageRequestDTO);
    }

//        // 내 리뷰 출력 (수정필요)
//    @GetMapping("/reviews/list/{goodsId}")
//    public ResponseEntity<?> showReviewList(@PathVariable("goodsId") Long goodsId, @RequestBody PageRequestDTO pageRequestDTO) {
//        log.info("** GoodsController => reviews() 실행됨 **");
//        return goodsService.showReviewList(goodsId, pageRequestDTO);
//    }


}
