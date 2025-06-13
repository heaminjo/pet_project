package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.goods.GoodsService;
import com.example.pet_back.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/goods")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {

    private final GoodsService goodsService;

    // 상품 상세정보
    @GetMapping("/detail/{goods_id}")
    public ResponseEntity<?> selectOne(@PathVariable("goods_id") Long goods_id) {
        log.info("** GoodsController => selectOne() 실행됨 **");
        return goodsService.selectOne(goods_id);
    }

    // 찜
    @PostMapping("/favorite/{goodsId}")
    public ResponseEntity<?> favorite(@PathVariable("goodsId") Long goodsId,  @AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** GoodsController => favorite() 실행됨 **");
        return goodsService.favorite(goodsId, userDetails);
    }

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
                                          @RequestPart("goods") GoodsRequestDTO goodsRequestDTO, //️
                                          @RequestPart("uploadImg") MultipartFile uploadImg,
                                          HttpServletRequest request) {
        log.info("** GoodsController => createGoods() 실행됨 **");
        System.out.println("goodsDTO 이름: " + goodsRequestDTO.getGoodsName());
        System.out.println("goodsDTO state: " + goodsRequestDTO.getGoodsState());
        System.out.println("goodsDTO state 타입: " + goodsRequestDTO.getGoodsState().getClass());

        try {
            goodsService.registerGoods(goodsRequestDTO, uploadImg, request);
        } catch (Exception e) {
            log.error("** goodsService.registerGoods Exception => " + e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("성공");
    }


    // 상품 수정 메서드 (관리자 페이지)
    @PostMapping("/update")
    public ResponseEntity<?> updateGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                         @RequestPart("goods") GoodsRequestDTO goodsRequestDTO){
        log.info("** GoodsController => createGoods() 실행됨 **");
        try {
            goodsService.updateGoods(userDetails, goodsRequestDTO);
        } catch (Exception e) {
            log.error("** goodsService.updateGoods Exception => " + e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("성공");
    }
    

    // 상품 삭제 메서드 (관리자 페이지)
    @PostMapping("/delete")
    public ResponseEntity<?> deleteGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                         @RequestPart("goods") GoodsRequestDTO goodsRequestDTO){
        log.info("** GoodsController => createGoods() 실행됨 **");
        try {
            goodsService.deleteGoods(userDetails, goodsRequestDTO);
        } catch (Exception e) {
            log.error("** goodsService.createGoods Exception => " + e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("성공");
    }
    
    
    
    
}
