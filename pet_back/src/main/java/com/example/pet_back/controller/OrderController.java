package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import com.example.pet_back.service.goods.OrderDetailService;
import com.example.pet_back.service.goods.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
                                       @RequestPart("review") ReviewUploadDTO reviewUploadDTO) {
        log.info("** OrderController => regReview() 실행됨 **");
        return orderService.regReview(userDetails, reviewUploadDTO);
    }



}
