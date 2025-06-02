package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_detail")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_detail_id", nullable = false)
    private Long order_detail_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id", nullable = false)
    private Goods goods;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Orders orders;

    @Column(nullable = false)
    private int goods_quantity;

    @Column
    private int goods_price;

}


