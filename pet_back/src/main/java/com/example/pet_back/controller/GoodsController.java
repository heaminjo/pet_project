package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.GoodsService;
import com.example.pet_back.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/goods")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {

    private final GoodsService goodsService;
    private final MemberService memberService;

    // 상품 리스트 출력 (메인)
    @GetMapping("/list")
    public ResponseEntity<?> showGoodsList() {
        log.info("** GoodsController => showGoodsList() 실행됨 **");
        System.out.println("GoodsController 상품리스트출력 : " + goodsService.showGoodsList().toString());
        return goodsService.showGoodsList();
    }

    // 상품등록 메서드 (관리자 페이지)
    @PostMapping("/register")
    public ResponseEntity<?> createGoods( //
                                          @AuthenticationPrincipal CustomUserDetails userDetails, //
                                          @RequestBody GoodsRequestDTO goodsRequestDTO, //
                                          HttpServletRequest request) {
        log.info("** GoodsController => createGoods() 실행됨 **");
        System.out.println("goodsDTO 이름: " + goodsRequestDTO.getGoods_name());
        System.out.println("goodsDTO state: " + goodsRequestDTO.getGoods_state());
        System.out.println("goodsDTO state 타입: " + goodsRequestDTO.getGoods_state().getClass());
        try {
            goodsService.registerGoods(goodsRequestDTO, request);
        } catch (Exception e) {
            log.error("** goodsService.registerGoods Exception => " + e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("성공");
    }

    @PostMapping("/pay")
    public ResponseEntity<?> payGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                      @RequestBody PayRequestDTO dto) {
        log.info("** GoodsController => payGoods() 실행됨 **");
        return goodsService.payGoods(userDetails, dto);
    }


}
