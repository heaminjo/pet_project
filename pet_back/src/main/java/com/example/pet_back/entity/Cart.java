package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

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
    @Column(nullable = false)
    private Long member_id;

    @Id
    @Column(nullable = false)
    private Long goods_id;

    @Column(nullable = false)
    private int quantity;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id", insertable = false, updatable = false)
    private Goods goods; // JPA Join 필요 (Goods 엔티티 포함)

}
