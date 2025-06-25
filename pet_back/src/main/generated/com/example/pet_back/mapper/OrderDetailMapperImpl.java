package com.example.pet_back.mapper;

import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.domain.goods.OrderDetailResponseDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Orders;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-25T10:14:10+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class OrderDetailMapperImpl implements OrderDetailMapper {

    @Override
    public OrderDetailResponseDTO toDTO(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }

        OrderDetailResponseDTO.OrderDetailResponseDTOBuilder orderDetailResponseDTO = OrderDetailResponseDTO.builder();

        orderDetailResponseDTO.goodsId( orderDetailGoodsGoodsId( orderDetail ) );
        orderDetailResponseDTO.goodsName( orderDetailGoodsGoodsName( orderDetail ) );
        orderDetailResponseDTO.price( orderDetailGoodsPrice( orderDetail ) );
        orderDetailResponseDTO.description( orderDetailGoodsDescription( orderDetail ) );
        orderDetailResponseDTO.goodsState( orderDetailGoodsGoodsState( orderDetail ) );
        orderDetailResponseDTO.imageFile( orderDetailGoodsImageFile( orderDetail ) );
        orderDetailResponseDTO.orderId( orderDetailOrdersOrderId( orderDetail ) );
        orderDetailResponseDTO.totalPrice( orderDetailOrdersTotalPrice( orderDetail ) );
        orderDetailResponseDTO.totalQuantity( orderDetailOrdersTotalQuantity( orderDetail ) );
        orderDetailResponseDTO.regDate( orderDetailOrdersRegDate( orderDetail ) );
        orderDetailResponseDTO.status( orderDetailOrdersStatus( orderDetail ) );
        orderDetailResponseDTO.orderDetailId( orderDetail.getOrderDetailId() );
        orderDetailResponseDTO.goodsQuantity( orderDetail.getGoodsQuantity() );
        orderDetailResponseDTO.goodsPrice( orderDetail.getGoodsPrice() );

        return orderDetailResponseDTO.build();
    }

    @Override
    public List<OrderDetailResponseDTO> toDTOList(List<OrderDetail> orderDetailList) {
        if ( orderDetailList == null ) {
            return null;
        }

        List<OrderDetailResponseDTO> list = new ArrayList<OrderDetailResponseDTO>( orderDetailList.size() );
        for ( OrderDetail orderDetail : orderDetailList ) {
            list.add( toDTO( orderDetail ) );
        }

        return list;
    }

    private Long orderDetailGoodsGoodsId(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Goods goods = orderDetail.getGoods();
        if ( goods == null ) {
            return null;
        }
        Long goodsId = goods.getGoodsId();
        if ( goodsId == null ) {
            return null;
        }
        return goodsId;
    }

    private String orderDetailGoodsGoodsName(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Goods goods = orderDetail.getGoods();
        if ( goods == null ) {
            return null;
        }
        String goodsName = goods.getGoodsName();
        if ( goodsName == null ) {
            return null;
        }
        return goodsName;
    }

    private int orderDetailGoodsPrice(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return 0;
        }
        Goods goods = orderDetail.getGoods();
        if ( goods == null ) {
            return 0;
        }
        int price = goods.getPrice();
        return price;
    }

    private String orderDetailGoodsDescription(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Goods goods = orderDetail.getGoods();
        if ( goods == null ) {
            return null;
        }
        String description = goods.getDescription();
        if ( description == null ) {
            return null;
        }
        return description;
    }

    private GOODSSTATE orderDetailGoodsGoodsState(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Goods goods = orderDetail.getGoods();
        if ( goods == null ) {
            return null;
        }
        GOODSSTATE goodsState = goods.getGoodsState();
        if ( goodsState == null ) {
            return null;
        }
        return goodsState;
    }

    private String orderDetailGoodsImageFile(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Goods goods = orderDetail.getGoods();
        if ( goods == null ) {
            return null;
        }
        String imageFile = goods.getImageFile();
        if ( imageFile == null ) {
            return null;
        }
        return imageFile;
    }

    private Long orderDetailOrdersOrderId(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Orders orders = orderDetail.getOrders();
        if ( orders == null ) {
            return null;
        }
        Long orderId = orders.getOrderId();
        if ( orderId == null ) {
            return null;
        }
        return orderId;
    }

    private int orderDetailOrdersTotalPrice(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return 0;
        }
        Orders orders = orderDetail.getOrders();
        if ( orders == null ) {
            return 0;
        }
        int totalPrice = orders.getTotalPrice();
        return totalPrice;
    }

    private int orderDetailOrdersTotalQuantity(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return 0;
        }
        Orders orders = orderDetail.getOrders();
        if ( orders == null ) {
            return 0;
        }
        int totalQuantity = orders.getTotalQuantity();
        return totalQuantity;
    }

    private LocalDate orderDetailOrdersRegDate(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Orders orders = orderDetail.getOrders();
        if ( orders == null ) {
            return null;
        }
        LocalDate regDate = orders.getRegDate();
        if ( regDate == null ) {
            return null;
        }
        return regDate;
    }

    private ORDERSTATE orderDetailOrdersStatus(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }
        Orders orders = orderDetail.getOrders();
        if ( orders == null ) {
            return null;
        }
        ORDERSTATE status = orders.getStatus();
        if ( status == null ) {
            return null;
        }
        return status;
    }
}
