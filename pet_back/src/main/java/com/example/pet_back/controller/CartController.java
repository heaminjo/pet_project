package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.CartService;
import com.example.pet_back.service.GoodsService;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/cart")
@RestController
public class CartController {

    private final CartService cartService;
    private final GoodsService goodsService;
    private final MemberService memberService;

    // 장바구니 리스트 출력
    @GetMapping(value = "/list") // @PathVariable 시 {name} 필수
    public ResponseEntity<?> cartList(@AuthenticationPrincipal CustomUserDetails userDetails) { // Cart entity
        log.info("** CartController => cartList() 실행됨 **");
        return cartService.selectList(userDetails);
    }

    // 상품을 장바구니에 추가
    @PostMapping("/add")
    public ResponseEntity<?> addToCart( //
                                        @AuthenticationPrincipal CustomUserDetails userDetails, //
                                        @RequestBody GoodsRequestDTO dto) {
        log.info("** CartController => addToCart() 실행됨 **");
        log.info("goodsRequestDTO ID => " + dto.getGoods_id());
        log.info("goodsRequestDTO 수량 => " + dto.getQuantity());
        dto.setQuantity(1);
        return cartService.addToCart(userDetails, dto);
    }


}
