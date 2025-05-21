package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.entity.Goods;
import org.apache.ibatis.annotations.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper
public interface GoodsMapper {
    void insertGoods(GoodsRequestDTO dto);
    List<GoodsResponseDTO> getAllGoods();
    Goods getGoodsById(int goodsId);
    List<GoodsResponseDTO> searchGoodsByKeyword(String keyword);
}
