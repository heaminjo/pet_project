package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "review")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", nullable = false)
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_detail_id", nullable = false)
    private OrderDetail orderDetail; // 엔티티 자체 매핑 (private Long delivery_id X)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member; // 엔티티 자체 매핑 (private Long member_id X)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id", nullable = false)
    private Goods goods; // 엔티티 자체 매핑 (private Long delivery_id X)

    @Column(name = "score", nullable = false)
    private int score;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "content", nullable = false, length = 1000)
    private String content;

    @Column(name = "image_file", length = 100)
    private String imageFile;

    @Column(name = "reg_date")
    private LocalDate regDate;

    @Column(name = "mod_date")
    private LocalDate modDate;

    // 엔티티 persist() 되기 직전에 자동 호출되는 콜백 메서드
    @PrePersist
    protected void onCreate() {
        this.regDate = LocalDate.now(); // save 전 reg_date 오늘 날짜로 자동 세팅됨
    }

    public Review(Member member, Goods goods, OrderDetail orderDetail, int score, String title, String content, String uploadImg) {
        super();
    }
}
