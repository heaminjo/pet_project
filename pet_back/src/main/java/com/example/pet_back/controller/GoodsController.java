package com.example.pet_back.controller;

import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.goods.CategoryResponseDTO;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/goods")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {

    private final GoodsService goodsService;
    private final MemberService memberService;

    // 상품 상세정보
    @GetMapping("/detail/{goods_id}")
    public ResponseEntity<?> selectOne(@PathVariable("goods_id") Long goods_id) {
        log.info("** GoodsController => selectOne() 실행됨 **");
        return goodsService.selectOne(goods_id);
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

    // 결제 메서드
    @PostMapping("/pay")
    public ResponseEntity<?> payGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                      @RequestBody PayRequestDTO dto) {
        log.info("** GoodsController => payGoods() 실행됨 **");
        log.info("결제 user = " + userDetails.getMember().getEmail()); // 이게 null?
        return goodsService.payGoods(userDetails, dto);
    }

    // 주문 리스트
    @GetMapping("/ordered")
    public ResponseEntity<?> orderList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** GoodsController => orderList() 실행됨 **");
        return goodsService.orderList(userDetails);
    }

    // 특정 고객이 한번이라도 주문한 적 있는 상품의 리스트
    @PostMapping("/orderinfo")
    public ResponseEntity<?> customerGoodsHistory(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody List<Long> orderIdList) {
        log.info("** GoodsController => customerGoodsHistory() 실행됨 **");
        return goodsService.customerGoodsHistory(userDetails, orderIdList);
    }


    // 결제페이지 - 고객 주소 가져오기
    @GetMapping("/findaddress")
    public ResponseEntity<?> findMemberAddress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** GoodsController => findMemberAddress() 실행됨 **");
        return goodsService.findMemberAddress(userDetails);
    }
    //배너 리스트 불러오기
    @GetMapping("/banner/list")
    public ResponseEntity<List<BannerDTO>> bannerList() {
        return ResponseEntity.ok(goodsService.bannerList());
    }

    //카테고리 불러오기
    @GetMapping("/category/list")
    public ResponseEntity<List<CategoryResponseDTO>> categoryList(){
        return ResponseEntity.ok(goodsService.categoryList());
    }
}
