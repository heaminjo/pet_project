package com.example.pet_back.repository;

import com.example.pet_back.constant.ROLE;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Long> {

    // 상품등록 쿼리 : INSERT 시 nativeQuery 만 가능
    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "INSERT INTO GOODS(" +
            "category_id, goods_name, price, description, goods_state, image_file, quantity) " +
            "VALUES (:category_id, :goods_name, :price, :description, :goods_state, :image_file, :quantity)")
    public void registerGoods(@Param("category_id") Long category_id, @Param("goods_name") String goods_name, //
                              @Param("price") int price, @Param("description") String description, //
                              @Param("goods_state") String goods_state, //
                              @Param("image_file") String image_file, @Param("quantity") int quantity);

    // 특정 고객이 한번이라도 주문한 적 있는 상품의 리스트
    @Transactional
    @Query("SELECT g FROM OrderDetail od " +
            "JOIN od.goods g " +
            "JOIN od.orders o " +
            "WHERE o.member.id = :memberId")
    public List<Goods> findAllByUserId(@Param("memberId") Long memberId);

    //검색
    @Query("SELECT g FROM Goods g " +
            "WHERE (:category IS NULL OR g.category.categoryId = :category) " +
            "AND (:keyword IS NULL OR g.goodsName LIKE :keyword)")
    Page<Goods> findSearchList(@Param("keyword") String keyword,
                               @Param("category") Long category,
                               Pageable pageable);
}
