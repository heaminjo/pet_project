package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "goods_best")
@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
//베스트 상품
public class GoodsBest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "best_id", nullable = false)
    private Long bestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id", nullable = false)
    private Goods goods ;

    private int position;
}
