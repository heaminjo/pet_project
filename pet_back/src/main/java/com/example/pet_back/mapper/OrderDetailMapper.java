package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.OrderDetailResponseDTO;
import com.example.pet_back.domain.goods.OrderDetailSimpleDTO;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderDetailMapper {

    OrderDetailResponseDTO toDTO(OrderDetail orderDetail);


    List<OrderDetailResponseDTO> toDTOList(List<OrderDetail> orderDetailList);


}
