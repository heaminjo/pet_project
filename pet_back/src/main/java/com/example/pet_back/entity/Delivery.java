package com.example.pet_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "delivery")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id", nullable = false)
    private Long deliveryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false) // FK => 연관관계 매핑
    private Member member; // 엔티티 자체 매핑 (private Long member_id X)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id") // FK => 연관관계 매핑
    private Address address;

    @Column(nullable = false)
    private String recipient;

    @Column(name = "delivery_name")
    private String deliveryName;

    @Column(name = "recipient_phone", nullable = false)
    private String recipientPhone;

    @Column(name = "request_message")
    private String requestMessage;

}
