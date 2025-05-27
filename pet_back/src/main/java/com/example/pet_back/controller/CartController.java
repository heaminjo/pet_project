package com.example.pet_back.controller;

import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.CartService;
import com.example.pet_back.service.GoodsService;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping(value = "/list") // @PathVariable 시 {name} 필수
    public ResponseEntity<?> cartList(@AuthenticationPrincipal CustomUserDetails userDetails){ // Cart entity
        log.info("** CartController => cartList() 실행됨 **");
        return cartService.selectList(userDetails);
    }


}
