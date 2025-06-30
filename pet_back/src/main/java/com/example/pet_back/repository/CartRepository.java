package com.example.pet_back.repository;

import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.CartId;
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


public interface CartRepository extends JpaRepository<Cart, CartId> {

    // 장바구니 조회 (GoodsIdList)
    @Transactional
    @Query("SELECT c FROM Cart c JOIN FETCH c.goods WHERE c.memberId = :userId")
    List<Cart> findCartListByUserId(@Param("userId") Long userId);

    // 장바구니 조회 (페이징용)
    @Transactional
    @EntityGraph(attributePaths = {"goods"})
    @Query("SELECT c FROM Cart c WHERE c.memberId = :userId")
    Page<Cart> findCartList(@Param("userId") Long userId, Pageable pageable);


    // 장바구니에 추가하는 쿼리
    // 값을 누적시키는 쿼리 (nativeQuery=true 경우만 가능.) : demo/repository/TestKeyRepository 부분 참고
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO cart VALUES(" +
            ":member_id, :goods_id, :quantity, :reg_date) ON DUPLICATE KEY UPDATE quantity=quantity+:quantity")
    int addToCart(@Param("member_id") Long member_id, @Param("goods_id") Long goods_id, @Param("quantity") int quantity, @Param("reg_date") LocalDate reg_date);

    // Goods id 로 장바구니 삭제 (결제완료후)
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM cart WHERE goods_id = :goods_id")
    void deleteByGoodsId(@Param("goods_id") Long goods_id);

    @Query(nativeQuery = true,value = "select count(*) from cart where member_id = :id")
    public int cartCount(@Param("id")Long id);

}
