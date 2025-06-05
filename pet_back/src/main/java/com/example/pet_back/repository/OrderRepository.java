package com.example.pet_back.repository;

import com.example.pet_back.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    @Transactional
    @Query("SELECT o FROM Orders o" +
            " WHERE o.member.id = :member_id")
    public List<Orders> findAllByUserId(@Param("member_id") Long member_id);
}
