package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

// Cart 엔티티 클래스
@Entity
@Table(name="goods")
@IdClass(CartId.class) // 복합키 클래스 지정

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart implements Serializable { // Serializable 상속

    @Id
    @Column(nullable = false)
    private int member_id;

    @Id
    @Column(nullable = false)
    private int goods_id;
    @Column(nullable = false)
    private int quantity;



}
