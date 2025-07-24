package com.example.pet_back.controller;

import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.goods.OrderService;
import com.example.pet_back.service.goods.PayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/delivery")
@RestController
@CrossOrigin(origins = {
        "http://13.209.222.217",
        "http://13.209.222.217:3000",
        "http://13.209.222.217:8080",
        "http://localhost:3000",
        "http://localhost:8080"
}, allowCredentials = "true")
public class DeliveryController {
    private final OrderService orderService;
    private final PayService payService;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 배 송 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @PostMapping("/status")
    public ORDERSTATE deliveryStatus(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                     @RequestParam("orderDetailId") Long orderDetailId) {
        log.info("** OrderController => orderList() 실행됨 **");
        return orderService.deliveryStatus(userDetails, orderDetailId); // ORDERSTATE
    }

    // 고객 주소 가져오기
    @GetMapping("/findAddress")
    public ResponseEntity<?> findMemberAddress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** OrderController => findMemberAddress() 실행됨 **");
        return payService.findMemberAddress(userDetails);
    }


}
