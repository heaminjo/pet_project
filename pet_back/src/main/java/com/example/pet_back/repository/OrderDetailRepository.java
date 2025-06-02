package com.example.pet_back.repository;

import com.example.pet_back.entity.OrderDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    @Transactional
    @Query("SELECT od FROM order_detail od" +
            " WHERE member_id=:member_id")
    public List<OrderDetail> findAllByUserId(@Param("member_id") Long member_id);


}
