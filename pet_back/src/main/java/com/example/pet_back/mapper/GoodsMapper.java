package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.entity.Goods;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GoodsMapper {

    //dto -> entity
    public Goods toEntity(GoodsRequestDTO dto);

    //entity -> dto
    public GoodsResponseDTO toDto(Goods goods);

    // Entity 리스트 -> DTO 리스트
    List<GoodsResponseDTO> toDtoList(List<Goods> goodsList);

    // DTO 리스트 -> Entity 리스트
    List<Goods> toEntityList(List<GoodsResponseDTO> goodsList);

}
