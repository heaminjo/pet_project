package com.example.pet_back.repository;

import com.example.pet_back.domain.admin.GoodsRankDTO;
import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.entity.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Transactional
    @Query("SELECT od FROM OrderDetail od WHERE od.orders.orderId IN :order_id")
    Page<OrderDetail> findAllByOrderIdList(@Param("order_id") List<Long> orderId, Pageable pageable);

    @Query(nativeQuery = true,value = "select * from order_detail where order_id = :id")
    List<OrderDetail> orderDetailList(@Param("id") Long orderId);


    @Query("SELECT new com.example.pet_back.domain.admin.GoodsRankDTO(" +
            "g.goodsId, g.goodsName, COUNT(o), SUM(g.price)) " +
            "FROM OrderDetail o JOIN o.goods g " +
            "GROUP BY g.goodsId, g.goodsName " +
            "ORDER BY SUM(g.price) DESC limit 10")
    List<GoodsRankDTO> goodsRank();

    List<OrderDetail> findAllByOrdersOrderIdIn(List<Long> orderIds);

    @Query("SELECT od FROM OrderDetail od WHERE od.orders.orderId = :orderId")
    List<OrderDetail> findAllByOrderId(@Param("orderId") Long orderId);

}
