package com.example.pet_back.controller;
import com.example.pet_back.domain.login.CartDTO;
import com.example.pet_back.domain.login.GoodsDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.service.CartService;
import com.example.pet_back.service.GoodsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/goods")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {

    private final CartService cservice;

    @GetMapping(value = "/cart/{name}") // @PathVariable 시 {name} 필수
    public ResponseEntity<?> cartList(@PathVariable String name){ // Cart entity
        ResponseEntity<?> result = null;
        List<GoodsDTO> list = cservice.findAllByName(name);

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
