package com.example.pet_back.controller;

import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import com.example.pet_back.service.goods.OrderDetailService;
import com.example.pet_back.service.goods.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/order")
@RestController
@CrossOrigin(origins = {
        "http://13.209.222.217",
        "http://13.209.222.217:3000",
        "http://13.209.222.217:8080",
        "http://localhost:3000",
        "http://localhost:8080"
}, allowCredentials = "true")
public class OrderController {

    private final MemberService memberService;
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 주 문 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // <OrderDetail /> : 주문 리스트
    @PostMapping("/detail")
    public ResponseEntity<?> orderList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** OrderController => orderList() 실행됨 **");
        return orderDetailService.orderList(userDetails, pageRequestDTO);
    }

    // <OrderList /> : 주문취소
    @PostMapping("/withdraw")
    public ResponseEntity<?> withdrawOrder(@AuthenticationPrincipal CustomUserDetails userDetails,  //
                                           @RequestBody WithDrawRequestDTO withDrawRequestDTO) {
        log.info("** OrderController => withdrawOrder() 실행됨 **");
        orderDetailService.withdraw(userDetails, withDrawRequestDTO);
        return ResponseEntity.ok("주문이 취소되었습니다.");
    }

    // <WithDrawList />  : 주문취소 이력 조회
    @PostMapping("/withdraw/list")
    public ResponseEntity<?> withDrawList(@AuthenticationPrincipal CustomUserDetails userDetails,  //
                                           @RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** OrderController => withdrawOrder() 실행됨 **");
        return orderDetailService.withDrawList(userDetails, pageRequestDTO);
    }


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 관 리 자 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // <DeliveryGoods />
    @PostMapping("/page/list")
    public PageResponseDTO<OrderSimpleDTO> ordersPageList(@RequestBody PageRequestDTO dto){
        log.info("** OrderController => ordersPageList() 실행됨 **");
        return orderService.ordersPageList(dto);
    }

    // 관리자 페이지:
    @PostMapping("/list/all")
    public ResponseEntity<?> orderAllList(@RequestBody PageRequestDTO pageRequestDTO){
        log.info("** OrderController => orderAllList() 실행됨 **");
        return orderService.orderAllList(pageRequestDTO);
    }

    // <OrderListAll />
    @PostMapping("/page/details")
    public PageResponseDTO<OrderDetailResponseDTO> orderDetailAllList(@RequestBody PageRequestDTO pageRequestDTO){
        log.info("** OrderController => orderDetailAllList() 실행됨 **");
        return orderDetailService.orderDetailAllList(pageRequestDTO);
    }





}
