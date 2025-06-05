package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.DeliveryRequestDTO;
import com.example.pet_back.domain.goods.DeliveryResponseDTO;
import com.example.pet_back.entity.Delivery;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeliveryMapper {
    //dto -> entity
    public Delivery toEntity(DeliveryRequestDTO dto);

    //entity -> dto
    public DeliveryResponseDTO toEntity(Delivery delivery);

    // Delivery 리스트 -> Entity 리스트
    List<Delivery> toEntityList(List<DeliveryRequestDTO> dto);

    // Delivery 리스트 -> DTO 리스트
    List<DeliveryResponseDTO> toDtoList(List<Delivery> deliveryList);


}
