package com.example.pet_back.mapper;

import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.constant.PAYMENT;
import com.example.pet_back.domain.goods.OrderRequestDTO;
import com.example.pet_back.domain.goods.OrderResponseDTO;
import com.example.pet_back.entity.Orders;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-04T18:11:47+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Orders toEntity(OrderRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Orders.OrdersBuilder orders = Orders.builder();

        orders.order_id( dto.getOrder_id() );
        orders.total_quantity( dto.getTotal_quantity() );
        orders.total_price( dto.getTotal_price() );
        if ( dto.getPayment() != null ) {
            orders.payment( Enum.valueOf( PAYMENT.class, dto.getPayment() ) );
        }
        orders.reg_date( dto.getReg_date() );
        if ( dto.getStatus() != null ) {
            orders.status( Enum.valueOf( ORDERSTATE.class, dto.getStatus() ) );
        }

        return orders.build();
    }

    @Override
    public OrderResponseDTO toEntity(Orders orders) {
        if ( orders == null ) {
            return null;
        }

        OrderResponseDTO.OrderResponseDTOBuilder orderResponseDTO = OrderResponseDTO.builder();

        orderResponseDTO.order_id( orders.getOrder_id() );
        orderResponseDTO.total_quantity( orders.getTotal_quantity() );
        orderResponseDTO.total_price( orders.getTotal_price() );
        if ( orders.getPayment() != null ) {
            orderResponseDTO.payment( orders.getPayment().name() );
        }
        orderResponseDTO.reg_date( orders.getReg_date() );
        if ( orders.getStatus() != null ) {
            orderResponseDTO.status( orders.getStatus().name() );
        }

        return orderResponseDTO.build();
    }

    @Override
    public List<Orders> toEntityList(List<OrderRequestDTO> dto) {
        if ( dto == null ) {
            return null;
        }

        List<Orders> list = new ArrayList<Orders>( dto.size() );
        for ( OrderRequestDTO orderRequestDTO : dto ) {
            list.add( toEntity( orderRequestDTO ) );
        }

        return list;
    }

    @Override
    public List<OrderResponseDTO> toDtoList(List<Orders> orderList) {
        if ( orderList == null ) {
            return null;
        }

        List<OrderResponseDTO> list = new ArrayList<OrderResponseDTO>( orderList.size() );
        for ( Orders orders : orderList ) {
            list.add( toEntity( orders ) );
        }

        return list;
    }
}
