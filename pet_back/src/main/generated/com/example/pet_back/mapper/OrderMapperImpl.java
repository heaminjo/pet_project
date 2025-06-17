package com.example.pet_back.mapper;

import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.constant.PAYMENT;
import com.example.pet_back.domain.goods.OrderRequestDTO;
import com.example.pet_back.domain.goods.OrderResponseDTO;
import com.example.pet_back.entity.Delivery;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.Orders;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-17T17:10:26+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Orders toEntity(OrderRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Orders.OrdersBuilder orders = Orders.builder();

        orders.orderId( dto.getOrderId() );
        orders.totalQuantity( dto.getTotalQuantity() );
        orders.totalPrice( dto.getTotalPrice() );
        if ( dto.getPayment() != null ) {
            orders.payment( Enum.valueOf( PAYMENT.class, dto.getPayment() ) );
        }
        orders.regDate( dto.getRegDate() );
        if ( dto.getStatus() != null ) {
            orders.status( Enum.valueOf( ORDERSTATE.class, dto.getStatus() ) );
        }

        return orders.build();
    }

    @Override
    public OrderResponseDTO toDto(Orders orders) {
        if ( orders == null ) {
            return null;
        }

        OrderResponseDTO.OrderResponseDTOBuilder orderResponseDTO = OrderResponseDTO.builder();

        orderResponseDTO.memberId( ordersMemberId( orders ) );
        orderResponseDTO.deliveryId( ordersDeliveryDeliveryId( orders ) );
        orderResponseDTO.orderId( orders.getOrderId() );
        orderResponseDTO.totalQuantity( orders.getTotalQuantity() );
        orderResponseDTO.totalPrice( orders.getTotalPrice() );
        if ( orders.getPayment() != null ) {
            orderResponseDTO.payment( orders.getPayment().name() );
        }
        orderResponseDTO.regDate( orders.getRegDate() );
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
            list.add( toDto( orders ) );
        }

        return list;
    }

    private Long ordersMemberId(Orders orders) {
        if ( orders == null ) {
            return null;
        }
        Member member = orders.getMember();
        if ( member == null ) {
            return null;
        }
        Long id = member.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long ordersDeliveryDeliveryId(Orders orders) {
        if ( orders == null ) {
            return null;
        }
        Delivery delivery = orders.getDelivery();
        if ( delivery == null ) {
            return null;
        }
        Long deliveryId = delivery.getDeliveryId();
        if ( deliveryId == null ) {
            return null;
        }
        return deliveryId;
    }
}
