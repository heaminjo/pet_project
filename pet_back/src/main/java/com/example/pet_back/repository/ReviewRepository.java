package com.example.pet_back.repository;

import com.example.pet_back.domain.goods.ReviewResponseDTO;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReviewRepository  extends JpaRepository<Review, Long> {

    @Transactional
    @Query("SELECT r FROM Review r WHERE r.goods.goodsId = :goodsId")
    Page<Review> findAllByGoodsId(@Param("goodsId") Long goodsId, Pageable pageable);

    @Transactional
    @Query("SELECT r FROM Review r WHERE r.member.id = :memberId")
    Page<Review> findAllByUserId(@Param("memberId") Long memberId, Pageable pageable);
    
    // 리뷰 중복등록 검증
    @Transactional
    Review findByMember_IdAndOrderDetail_OrderDetailId(Long memberId, Long orderDetailId);
    

}
