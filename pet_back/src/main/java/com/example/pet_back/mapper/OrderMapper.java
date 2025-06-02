package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.DeliveryResponseDTO;
import com.example.pet_back.domain.goods.OrderRequestDTO;
import com.example.pet_back.entity.Delivery;
import com.example.pet_back.entity.Orders;

public interface OrderMapper {
    //dto -> entity
    public Orders toEntity(OrderRequestDTO dto);

    //entity -> dto
    public DeliveryResponseDTO toEntity(Delivery delivery);

}
