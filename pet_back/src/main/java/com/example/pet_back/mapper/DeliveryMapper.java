package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.DeliveryRequestDTO;
import com.example.pet_back.domain.goods.DeliveryResponseDTO;
import com.example.pet_back.entity.Delivery;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DeliveryMapper {
    //dto -> entity
    public Delivery toEntity(DeliveryRequestDTO dto);

    //entity -> dto
    public DeliveryResponseDTO toEntity(Delivery delivery);


}
