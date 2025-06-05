package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.OrderRequestDTO;
import com.example.pet_back.domain.goods.OrderResponseDTO;
import com.example.pet_back.entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    // Orders : dto -> entity
    Orders toEntity(OrderRequestDTO dto);

    // Orders : entity -> dto
    @Mapping(source = "member.id", target = "member_id") // Entity <-> DTO 매핑을 위해 필요
    // Orders 엔티티의 @JoinColumn(name = "member_id", nullable = false) 는 DB <-> Entity 매핑을 위해 필요
    @Mapping(source = "delivery.delivery_id", target = "delivery_id")
    OrderResponseDTO toDto(Orders orders);

    // Orders : DTO 리스트 -> Entity 리스트
    List<Orders> toEntityList(List<OrderRequestDTO> dto);

    // Orders : Entity 리스트 -> DTO 리스트
    List<OrderResponseDTO> toDtoList(List<Orders> orderList);


}
