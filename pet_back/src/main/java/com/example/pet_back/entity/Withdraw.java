package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "withdraw")
@IdClass(WithDrawId.class)
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Withdraw {

    @Id
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "goods_id", nullable = false)
    private Long goodsId;

    @Id
    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "reason", length = 200)
    private String reason;

    @Column(name = "return_date", nullable = false)
    private LocalDate returnDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;


}
