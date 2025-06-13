package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.goods.GoodsService;
import com.example.pet_back.service.goods.OrderDetailService;
import com.example.pet_back.service.goods.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/order")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;
    private final OrderDetailService orderDetailService;

    // <OrderDetail /> : 주문 리스트
    @PostMapping("/detail")
    public ResponseEntity<?> orderList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO dto) {
        log.info("** GoodsController => orderList() 실행됨 **");
        return orderDetailService.orderList(userDetails, dto);
    }

    // 결제페이지 - 고객 주소 가져오기
    @GetMapping("/findaddress")
    public ResponseEntity<?> findMemberAddress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** GoodsController => findMemberAddress() 실행됨 **");
        return orderService.findMemberAddress(userDetails);
    }

    // 결제 메서드
    @PostMapping("/pay")
    public ResponseEntity<?> payGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                      @RequestBody PayRequestDTO dto) {
        log.info("** GoodsController => payGoods() 실행됨 **");
        log.info("결제 user = " + userDetails.getMember().getEmail()); // 이게 null?
        return orderService.payGoods(userDetails, dto);
    }

}
