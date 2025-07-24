package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.goods.PaymentPreviewDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.goods.OrderService;
import com.example.pet_back.service.goods.PayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/pay")
@RestController
@CrossOrigin(origins = {
        "http://13.209.222.217",
        "http://13.209.222.217:3000",
        "http://13.209.222.217:8080",
        "http://localhost:3000",
        "http://localhost:8080"
}, allowCredentials = "true")
public class PayController {

    private final PayService payService;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결 제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 결제 메서드
    @PostMapping("")
    public ResponseEntity<?> payGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                      @RequestBody PayRequestDTO dto) {
        log.info("** OrderController => payGoods() 실행됨 **");
        log.info("결제 user = " + userDetails.getMember().getEmail()); // 이게 null?
        System.out.println("deliveryName; "+dto.getDeliveryName());
        System.out.println("recipientPhone; "+dto.getRecipientPhone());
        System.out.println("requestMessage; "+dto.getRequestMessage());
        return payService.payGoods(userDetails, dto);
    }

    // 결제 시 등급, 등급별 할인율 표시 (백엔드 일괄 처리)
    @PostMapping("/preview")
    public ResponseEntity<PaymentPreviewDTO> getPaymentPreview(
            @RequestBody List<Map<String, Object>> goodsList, // quantity: 1 , .... 등의 goods list
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** OrderController => getPaymentPreview() 실행됨 **");

        return ResponseEntity.ok(payService.calculatePaymentPreview(goodsList, userDetails));
    }

}
