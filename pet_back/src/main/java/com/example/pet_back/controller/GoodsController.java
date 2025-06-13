package com.example.pet_back.controller;


import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;

import com.example.pet_back.service.goods.GoodsService;

import com.example.pet_back.service.ImageService;

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
    private final ImageService imageService;

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
    @PostMapping("/list")
    public ResponseEntity<?> showGoodsList(@RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** GoodsController => showGoodsList() 실행됨 **");
//        System.out.println("GoodsController 상품리스트출력 : " + goodsService.showGoodsList(pageRequestDTO).toString());
        return goodsService.showGoodsList(pageRequestDTO);
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

    // 결제페이지 - 고객 주소 가져오기
    @GetMapping("/findaddress")
    public ResponseEntity<?> findMemberAddress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** GoodsController => findMemberAddress() 실행됨 **");
        return goodsService.findMemberAddress(userDetails);
    }
    //배너 리스트 불러오기(조해민)
    @GetMapping("/banner/list")
    public ResponseEntity<List<BannerDTO>> bannerList() {
        return ResponseEntity.ok(goodsService.bannerList());
    }

    //카테고리 불러오기(조해민)
    @GetMapping("/category/list")
    public ResponseEntity<List<CategoryResponseDTO>> categoryList(){
        return ResponseEntity.ok(goodsService.categoryList());
    }


    //상품 페이징 목록(조해민)
    @PostMapping("/page/list")
    public ResponseEntity<PageResponseDTO<GoodsSimpleDTO>> goodsPageList(@RequestBody PageRequestDTO dto){
        return ResponseEntity.ok(goodsService.goodsPageList(dto));
    }

    //배너 추가(조해민)
    @PostMapping("/banner/insert")
    public ResponseEntity<ApiResponse> goodsPageList(@RequestParam ("file") MultipartFile file,@RequestParam("position") int position){
        return ResponseEntity.ok(imageService.bannerInsert(file,position));
    }

}
