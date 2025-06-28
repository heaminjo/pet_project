package com.example.pet_back.repository;

import com.example.pet_back.entity.WithDrawId;
import com.example.pet_back.entity.Withdraw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface WithDrawRepository extends JpaRepository<Withdraw, WithDrawId> {

    @Query("SELECT w FROM Withdraw w WHERE w.orderId = :orderId AND w.goodsId = :goodsId AND w.memberId = :memberId")
    Optional<Withdraw> findReason(@Param("orderId") Long orderId, @Param("goodsId") Long goodsId, @Param("memberId") Long memberId);


}
