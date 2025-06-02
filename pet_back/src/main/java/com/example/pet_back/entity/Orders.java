package com.example.pet_back.entity;

import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.constant.PAYMENT;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "orders")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Long order_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_id", nullable = false) // FK => 연관관계 매핑
    private Delivery delivery; // 엔티티 자체 매핑 (private Long delivery_id X)


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false) // FK => 연관관계 매핑
    private Member member; // 엔티티 자체 매핑 (private Long member_id X)

    @Column
    private int total_quantity;

    @Column
    private int total_price;

    @Column(length = 30)
    @Enumerated(EnumType.STRING)
    private PAYMENT payment;

    @Column(name = "reg_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date reg_date;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private ORDERSTATE status;

    // 엔티티 persist() 되기 직전에 자동 호출되는 콜백 메서드
    @PrePersist
    protected void onCreate() {
        this.reg_date = new Date(); // save 전 reg_date 오늘 날짜로 자동 세팅됨
    }
}
