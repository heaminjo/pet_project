package com.example.pet_back.repository;

import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.CartId;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, CartId> {

    @Transactional
   //  @Query("select c from Cart c where c.member_id = :id") // JPQL - 엔티티 사용시
    @Query("select new com.example.pet_back.domain.login.CartDTO(c.member_id, c.goods_id, c.quantity)" + //
            " from Cart c where c.member_id = :id") // JPQL - DTO 사용시
    public List<Cart> findById(@Param("id") Long id);

}
