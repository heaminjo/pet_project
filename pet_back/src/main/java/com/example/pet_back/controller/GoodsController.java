package com.example.pet_back.controller;

import com.example.pet_back.service.GoodsService;
import com.example.pet_back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/goods")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {

    private final GoodsService goodsService;
    private final MemberService memberService;


}
