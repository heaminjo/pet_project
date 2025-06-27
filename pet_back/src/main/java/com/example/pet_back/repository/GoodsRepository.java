package com.example.pet_back.repository;

import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.constant.ROLE;
import com.example.pet_back.domain.goods.CategoryResponseDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Category;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Long> {

    // 상품등록 쿼리 : INSERT 시 nativeQuery 만 가능
    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "INSERT INTO GOODS(" +
            "category_id, goods_name, price, description, goods_state, image_file, quantity, reg_date) " +
            "VALUES (:category_id, :goods_name, :price, :description, :goods_state, :image_file, :quantity, :reg_date)")
    void registerGoods(@Param("category_id") Long category_id, @Param("goods_name") String goods_name, //
                       @Param("price") int price, @Param("description") String description, //
                       @Param("goods_state") String goods_state, @Param("image_file") String image_file, //
                       @Param("quantity") int quantity, @Param("reg_date")LocalDate reg_date);

    // 상품수정
    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE GOODS SET " +
            "category_id = :category_id, " +
            "goods_name = :goods_name, " +
            "price = :price, " +
            "description = :description, " +
            "goods_state = :goods_state, " +
            "image_file = :image_file, " +
            "quantity = :quantity " +
            "WHERE goods_id = :goods_id")
    void updateGoods(@Param("goods_id") Long goodsId, @Param("category_id") Long categoryId,
                     @Param("goods_name") String goodsName, @Param("price") int price,
                     @Param("description") String description, @Param("goods_state") String goodsState,
                     @Param("image_file") String imageFile, @Param("quantity") int quantity);

    // 특정 고객이 한번이라도 주문한 적 있는 상품의 리스트
    @Transactional
    @Query("SELECT g FROM OrderDetail od " +
            "JOIN od.goods g " +
            "JOIN od.orders o " +
            "WHERE o.member.id = :memberId")
    List<Goods> findAllByUserId(@Param("memberId") Long memberId);

    // 찜 목록 조회 (서브쿼리 사용)
    @Transactional
    @Query("SELECT g FROM Goods g WHERE g.goodsId IN (SELECT f.goodsId FROM Favorite f WHERE f.memberId = :memberId)")
    // select * from goods where goods_id IN (select goods_id from favorite where member_id=8);
    Page<Goods> findFavoriteList(@Param("memberId") Long memberId, Pageable pageable);


    // 검색 기능 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @Transactional
    @Query("SELECT g FROM Goods g " +
            "WHERE (:keyword IS NULL OR g.goodsName LIKE :keyword)")
    Page<Goods> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Transactional
    @Query("SELECT g FROM Goods g " +
            "WHERE (:category IS NULL OR g.category.categoryId = :category)")
    Page<Goods> findByCategory( @Param("category") Long category, Pageable pageable);


    // Type 과 Keyword 로 조회
    @Transactional
    @Query("SELECT g FROM Goods g " +
            "WHERE (:category IS NULL OR g.category.categoryId = :category) " +
            "AND (:keyword IS NULL OR g.goodsName LIKE :keyword)")
    Page<Goods> findByCategoryAndKeyword(@Param("keyword") String keyword,
                               @Param("category") Long category,
                               Pageable pageable);


    //검색
    @Query("SELECT g FROM Goods g " +
            "WHERE (:category IS NULL OR g.category.categoryId = :category) " +
            "AND (:keyword IS NULL OR g.goodsName LIKE :keyword) "+
            "AND (:state IS NULL OR g.goodsState LIKE :state)")
    Page<Goods> findSearchList(@Param("keyword") String keyword,
                               @Param("category") Long category,
                               @Param("state") GOODSSTATE state,
                               Pageable pageable);


    //카테고리에 상품이있는지 확인
    public boolean existsByCategory(Category category);
}
