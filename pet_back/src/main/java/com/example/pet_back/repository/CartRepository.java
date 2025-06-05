package com.example.pet_back.repository;

import com.example.pet_back.domain.goods.CartResponseDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.CartId;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CartRepository extends JpaRepository<Cart, CartId> {

    // 장바구니 조회에 필요한 컬럼
    @Transactional
    @Query("SELECT " +
            "NEW com.example.pet_back.domain.goods.CartResponseDTO " +
            "(g.goods_id, g.goods_name, g.price, g.description, g.image_file, g.rating, " +
            "g.views, g.review_num, c.member_id, c.quantity) " +
            "FROM Cart c " +
            "JOIN Goods g ON g.goods_id = c.goods_id " +
            "WHERE c.member_id=:userId")
    public List<CartResponseDTO> findCartListByUserId(Long userId);

    // 장바구니에 추가하는 쿼리
    // 값을 누적시키는 쿼리 (nativeQuery=true 경우만 가능.) : demo/repository/TestKeyRepository 부분 참고
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO Cart VALUES(" +
            ":member_id, :goods_id, :quantity) ON DUPLICATE KEY UPDATE quantity=quantity+:quantity")
    public int addToCart(@Param("member_id") Long member_id, @Param("goods_id") Long goods_id, @Param("quantity") int quantity);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    @Transactional
    //  @Query("select c from Cart c where c.member_id = :id") // JPQL - 엔티티 사용시
//    @Query("select new com.example.pet_back.domain.login.CartDTO(c.member_id, c.goods_id, c.quantity)" + //
//            " from Cart c where c.member_id = :id") // JPQL - DTO 사용시
//    public List<Cart> findById(@Param("id") Long id);

    // (잠정폐기) 우선, 해당 메서드는 주석처리하고 memberRepository 를 이용하기로 한다.
//    @Transactional
//    @Query("select new com.example.pet_back" + //
//            ".domain.login.GoodsDTO(" + //
//            "g.id, g.category_id, g.goods_name, g.price, g.description, g.goods_state, g.image_file, g.rating, g.review_num, g.quantity)" + //
//            " FROM Goods g" +
//            " JOIN Cart c ON g.goods_id = c.goods_id" +
//            " JOIN Member m ON m.member_id = c.member_id" +
//            " WHERE m.member_id = :id") // JPQL - DTO 사용시
//    List<GoodsDTO> findAllById(@Param("id") Long id);

}
