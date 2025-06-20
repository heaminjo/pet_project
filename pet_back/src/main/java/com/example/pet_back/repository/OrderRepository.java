package com.example.pet_back.repository;

import com.example.pet_back.domain.admin.OrderStatisticsDTO;
import com.example.pet_back.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    // 특정 회원이 주문한 Order 전체
    @Transactional
    @Query("SELECT o FROM Orders o" +
            " WHERE o.member.id = :memberId")
    List<Orders> findAllByUserId(@Param("memberId") Long member_id);

    @Query(nativeQuery = true, value = "select * from orders where member_id = :id order by reg_date desc limit 3")
    List<Orders> recentOrderList(@Param("id") Long member_id);


    @Query("SELECT new com.example.pet_back.domain.admin.OrderStatisticsDTO( " +
            "SUM(o.totalPrice), COUNT(o), AVG(o.totalPrice)) " +
            "FROM Orders o " +
            "WHERE o.regDate >= :startDate AND o.regDate < :endDate")
    OrderStatisticsDTO orderStatistics(@Param("startDate") LocalDate startDate,
                                       @Param("endDate") LocalDate endDate);

}
