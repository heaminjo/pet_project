package com.example.pet_back.entity;

import com.example.pet_back.constant.GOODSSTATE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "goods")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goods_id", nullable = false)
    private Long goods_id;

    @Column(nullable = false, unique = true)
    private Long category_id;

    @Column(nullable = false, length = 30)
    private String goods_name;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false, length = 1000)
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private GOODSSTATE goods_state = GOODSSTATE.SALE;

    @Column(nullable = false, length = 100)
    private String image_file;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private int views;

    @Column(nullable = false)
    private int review_num;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private Date reg_date;

}
