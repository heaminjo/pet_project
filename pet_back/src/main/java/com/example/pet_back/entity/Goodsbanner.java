package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "goods_banner")
@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goodsbanner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "banner_id", nullable = false)
    private Long bannerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id", nullable = false) // FK => 연관관계 매핑
    private Goods goods; // 엔티티 자체 매핑 (private Long delivery_id X)

    private int position;

}
