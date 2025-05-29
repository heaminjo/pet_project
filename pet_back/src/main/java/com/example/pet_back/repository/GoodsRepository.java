package com.example.pet_back.repository;

import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.entity.Goods;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Long> {

    // ( findAll()로 대체됨 ) 전체 상품리스트 출력 쿼리 :
    @Transactional
    @Query("SELECT new com.example.pet_back.domain.goods.GoodsResponseDTO(" +
            "g.category_id, g.goods_name, g.price, g.description, g.goods_state, g.image_file, g.quantity) " +
            "FROM Goods g")
    public List<GoodsResponseDTO> showGoodsList();


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
