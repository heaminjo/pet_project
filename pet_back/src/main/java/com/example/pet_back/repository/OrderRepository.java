package com.example.pet_back.repository;

import com.example.pet_back.domain.admin.OrderStatisticsDTO;
import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
            "COALESCE(SUM(o.totalPrice),0), COALESCE(COUNT(o),0), COALESCE(AVG(o.totalPrice),0)) " +
            "FROM Orders o " +
            "WHERE o.regDate >= :startDate AND o.regDate < :endDate")
    OrderStatisticsDTO orderStatistics(@Param("startDate") LocalDate startDate,
                                       @Param("endDate") LocalDate endDate);

    //검색
    @Query("SELECT DISTINCT o FROM Orders o " +
            "JOIN OrderDetail od ON od.orders.orderId = o.orderId " +
            "JOIN od.goods g " +
            "WHERE (:category IS NULL OR g.category.categoryId = :category) " +
            "AND (:keyword IS NULL OR g.goodsName LIKE %:keyword%) " +
            "AND (:state IS NULL OR o.status = :state)")
    Page<Orders> findSearchList(@Param("keyword") String keyword,
                                     @Param("category") Long category,
                                     @Param("state") ORDERSTATE state,
                                     Pageable pageable);

}
