package com.example.pet_back.controller;

import com.example.pet_back.service.GoodsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequiredArgsConstructor // private final만
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {

    private final GoodsService goodsService;

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("hello");

    }


//    // 주문 등록
//    @PostMapping("/order")
//    public ResponseEntity<?> orderGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
//                                        @RequestBody GoodsRequestDTO goodsRequestDTO) {
//        log.info("** HomeController => orderGoods() 실행됨 **");
//        return goodsService.orderGoods();
//    }
//
//    // 주문 리스트
//    @GetMapping("/orderlist")
//    public ResponseEntity<?> orderGoodsList(@AuthenticationPrincipal CustomUserDetails userDetails, //
//                                            @RequestBody GoodsRequestDTO goodsRequestDTO) {
//        log.info("** HomeController => orderGoodsList() 실행됨 **");
//    }

}
