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

    @Mapping(source = "goods.goodsId", target = "goodsId")
    @Mapping(source = "goods.goodsName", target = "goodsName")
    @Mapping(source = "goods.price", target = "price")
    @Mapping(source = "goods.description", target = "description")
    @Mapping(source = "goods.goodsState", target = "goodsState")
    @Mapping(source = "goods.imageFile", target = "imageFile")

    @Mapping(source = "orders.orderId", target = "orderId")
    @Mapping(source = "orders.totalPrice", target = "totalPrice")
    @Mapping(source = "orders.totalQuantity", target = "totalQuantity")
    @Mapping(source = "orders.regDate", target = "regDate")
    @Mapping(source = "orders.status", target = "status")
    OrderDetailResponseDTO toDTO(OrderDetail orderDetail);


    List<OrderDetailResponseDTO> toDTOList(List<OrderDetail> orderDetailList);


}
