package com.example.pet_back.repository;

import com.example.pet_back.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    @Transactional
    @Query("SELECT od FROM OrderDetail od WHERE od.orders.orderId IN :order_id")
    public List<OrderDetail> findAllByOrderIdList(@Param("order_id") List<Long> orderId);


}
