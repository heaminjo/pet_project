package com.example.pet_back.repository;

import com.example.pet_back.entity.Goods;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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


}
