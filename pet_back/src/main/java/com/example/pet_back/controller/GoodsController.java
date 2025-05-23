package com.example.pet_back.controller;
import com.example.pet_back.domain.login.CartDTO;
import com.example.pet_back.domain.login.GoodsDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.CartService;
import com.example.pet_back.service.GoodsService;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/goods")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {

    private final CartService cartService;
    private final GoodsService goodsService;
    private final MemberService memberService;

    @GetMapping(value = "/cart") // @PathVariable 시 {name} 필수
    public ResponseEntity<?> cartList(@AuthenticationPrincipal CustomUserDetails userDetails){ // Cart entity
        ResponseEntity<?> result = null;

        goodsService.findAllByUserId(userDetails);

        if(list != null){
            result = ResponseEntity.ok(list);
            log.info("** HttpStatus.OK => " + HttpStatus.OK);
        }else{
            result = ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("장바구니 목록이 존재하지 않습니다.");
            log.error("** HttpStatus.BAD_GATEWAY => " + HttpStatus.BAD_GATEWAY);
        }
        return result;
    }



}
