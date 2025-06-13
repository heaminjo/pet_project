package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.goods.CartService;
import com.example.pet_back.service.goods.GoodsService;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/cart")
@RestController
public class CartController {

    private final CartService cartService;
    private final GoodsService goodsService;
    private final MemberService memberService;

    // 장바구니 리스트 출력
    // @GetMapping(value = "/list") => Paging 추가로 @PostMapping으로 변경함
    @PostMapping(value = "/list") // @PathVariable 시 {name} 필수
    public ResponseEntity<?> cartList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO dto) { // Cart entity
        log.info("** CartController => cartList() 실행됨 **");
        return cartService.selectList(userDetails, dto);
    }

    // 상품을 장바구니에 추가
    @PostMapping("/add")
    public ResponseEntity<?> addToCart( //
                                        @AuthenticationPrincipal CustomUserDetails userDetails, //
                                        @RequestBody GoodsRequestDTO dto) {
        log.info("** CartController => addToCart() 실행됨 **");
        log.info("goodsRequestDTO ID => " + dto.getGoodsId());
        log.info("goodsRequestDTO 수량 => " + dto.getQuantity());
        return cartService.addToCart(userDetails, dto);
    }


}
