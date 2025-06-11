package com.example.pet_back.entity;

import com.example.pet_back.constant.GOODSSTATE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

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
    private Long goodsId;

    @Column(name = "category_id", nullable = false, unique = true)
    private Long categoryId;

    @Column(name = "goods_name", nullable = false, length = 30)
    private String goodsName;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false, length = 1000)
    private String description;

    // 상품 상태 (SALE, SOLDOUT, HIDDEN)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "goods_state", nullable = false)
    private GOODSSTATE goodsState = GOODSSTATE.SALE;

    @Column(name = "image_file", nullable = false, length = 100)
    private String imageFile;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private int views;

    @Column(name = "review_num", nullable = false)
    private int reviewNum;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "reg_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate regDate;

    @Transient // SQL 구문처리시 제외시켜줌
    private MultipartFile uploadImg;

    // 엔티티 persist() 되기 직전에 자동 호출되는 콜백 메서드
    @PrePersist
    protected void onCreate() {
        this.regDate = LocalDate.now(); // save 전 reg_date 오늘 날짜로 자동 세팅됨
    }

}
