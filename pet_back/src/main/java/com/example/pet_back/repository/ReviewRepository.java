package com.example.pet_back.repository;

import com.example.pet_back.domain.goods.ReviewResponseDTO;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReviewRepository  extends JpaRepository<Review, Long> {

    @Transactional
    @Query("SELECT new com.example.pet_back.domain.goods.ReviewResponseDTO(" +
            "r.reviewId, r.member.id, r.orderDetail.orderDetailId, r.goods.goodsId, r.score, " +
            "r.title, r.content, r.imageFile, r.regDate, r.modDate) " +
            "FROM Review r WHERE r.goods.goodsId = :goodsId")
    Page<ReviewResponseDTO> findAllByGoodsId(@Param("goodsId") Long goodsId, Pageable pageable);


}
