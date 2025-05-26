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

    private final GoodsService goodsService;
    private final MemberService memberService;



}
