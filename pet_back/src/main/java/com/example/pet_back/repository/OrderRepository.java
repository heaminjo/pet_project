package com.example.pet_back.repository;

import com.example.pet_back.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    // 특정 회원이 주문한 Order 전체
    @Transactional
    @Query("SELECT o FROM Orders o" +
            " WHERE o.member.id = :memberId")
    public List<Orders> findAllByUserId(@Param("memberId") Long member_id);


    @Transactional
    @Query("SELECT o FROM Orders o WHERE o.orderId = :order_id")
    public List<Orders> findAllByOrderId(@Param("order_id") Long orderId);


}
