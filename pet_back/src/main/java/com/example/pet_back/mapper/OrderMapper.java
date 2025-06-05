package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.OrderRequestDTO;
import com.example.pet_back.domain.goods.OrderResponseDTO;
import com.example.pet_back.entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    // Orders : dto -> entity
    public Orders toEntity(OrderRequestDTO dto);

    // Orders : entity -> dto
    public OrderResponseDTO toEntity(Orders orders);

    // Orders : DTO 리스트 -> Entity 리스트
    List<Orders> toEntityList(List<OrderRequestDTO> dto);

    // Orders : Entity 리스트 -> DTO 리스트
    List<OrderResponseDTO> toDtoList(List<Orders> orderList);


}
