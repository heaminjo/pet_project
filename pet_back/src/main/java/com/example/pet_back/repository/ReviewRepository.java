package com.example.pet_back.repository;

import com.example.pet_back.domain.goods.ReviewResponseDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
//    @Query("SELECT r FROM Review r WHERE r.member.id = :memberId AND r.orderDetail.orderDetailId = :orderDetailId")
//    Optional<Review> findReviews(@Param("memberId") Long memberId, @Param("orderDetailId") Long orderDetailId);
    // Optional → List로 변경
    @Query("SELECT r FROM Review r WHERE r.member.id = :memberId AND r.orderDetail.orderDetailId = :orderDetailId")
    Optional<Review> findReviews(@Param("memberId") Long memberId, @Param("orderDetailId") Long orderDetailId);


    // 리뷰 목록
    @Query("SELECT r FROM Review r WHERE r.orderDetail.orderDetailId IN (:orderDetailIdList)")
    List<Review> findByOrderDetailIdIn(@Param("orderDetailIdList") List<Long> orderDetailIdList);

    // 리뷰 수정 (덮어쓰기)
    @Modifying
    @Query("UPDATE Review r SET r.orderDetail = :orderDetail, r.goods = :goods, r.score = :score, " +
            "r.title = :title, r.content = :content, r.imageFile = :imageFile, r.modDate = :modDate " +
            "WHERE r.orderDetail.orderDetailId = :orderDetailId AND r.reviewId = :reviewId")
    void updateReview(@Param("orderDetail") OrderDetail orderDetail,
                      @Param("goods") Goods goods,
                      @Param("score") int score,
                      @Param("title") String title,
                      @Param("content") String content,
                      @Param("imageFile") String imageFile,
                      @Param("modDate") LocalDate modDate,
                      @Param("orderDetailId") Long orderDetailId,
                      @Param("reviewId") Long reviewId);




}
