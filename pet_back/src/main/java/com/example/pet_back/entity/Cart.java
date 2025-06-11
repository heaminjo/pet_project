package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

// Cart 엔티티 클래스
@Entity
@Table(name = "cart")
@IdClass(CartId.class) // 복합키 클래스 지정
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart implements Serializable { // Serializable 상속

    @Id
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Id
    @Column(name = "goods_id", nullable = false)
    private Long goodsId;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "reg_date", nullable = false)
    private LocalDate regDate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id", insertable = false, updatable = false)
    private Goods goods; // JPA 가 연관관계 조회시 필요 (Join : Goods 엔티티 포함)

}
