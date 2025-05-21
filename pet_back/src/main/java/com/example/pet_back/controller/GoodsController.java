package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.mapper.GoodsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/goods")
public class GoodsController {

    private final GoodsMapper goodsMapper;

    @PostMapping
    public ResponseEntity<String> insertGoods(@RequestBody GoodsRequestDTO dto) {
        goodsMapper.insertGoods(dto);
        return ResponseEntity.ok("상품 등록 성공");
    }

    @GetMapping
    public ResponseEntity<List<GoodsResponseDTO>> getAllGoods() {
        return ResponseEntity.ok(goodsMapper.getAllGoods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Goods> getGoodsById(@PathVariable int id) {
        return ResponseEntity.ok(goodsMapper.getGoodsById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<GoodsResponseDTO>> searchGoods(@RequestParam String keyword) {
        return ResponseEntity.ok(goodsMapper.searchGoodsByKeyword(keyword));
    }
}
