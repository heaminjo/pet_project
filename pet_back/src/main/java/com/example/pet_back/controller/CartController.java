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
import org.springframework.web.bind.annotation.*;


@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/cart")
@RestController
@CrossOrigin(origins = {
        "http://13.209.222.217",
        "http://13.209.222.217:3000",
        "http://13.209.222.217:8080",
        "http://localhost:3000",
        "http://localhost:8080"
}, allowCredentials = "true")
public class CartController {

    private final CartService cartService;
    private final GoodsService goodsService;
    private final MemberService memberService;

    // 장바구니 리스트 출력
    // @GetMapping(value = "/list") => Paging 추가로 @PostMapping으로 변경함
    @PostMapping(value = "/list") // @PathVariable 시 {name} 필수
    public ResponseEntity<?> cartList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO pageRequestDTO) { // Cart entity
        log.info("** CartController => cartList() 실행됨 **");
        return cartService.selectList(userDetails, pageRequestDTO);
    }

    // 상품을 장바구니에 추가
    @PostMapping("/add")
    public ResponseEntity<?> addToCart( //
                                        @AuthenticationPrincipal CustomUserDetails userDetails, //
                                        @RequestParam("goodsId") Long goodsId,
                                        @RequestParam("quantity") int quantity) {
        log.info("** CartController => addToCart() 실행됨 **");
        return cartService.addToCart(userDetails, goodsId, quantity);
    }


}
