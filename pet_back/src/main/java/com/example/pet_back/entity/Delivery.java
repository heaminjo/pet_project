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
    private Long delivery_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false) // FK => 연관관계 매핑
    private Member member; // 엔티티 자체 매핑 (private Long member_id X)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id") // FK => 연관관계 매핑
    private Address address;

    @Column(nullable = false)
    private String recipient;

    @Column
    private String delivery_name;

    @Column(nullable = false)
    private String recipient_phone;

    @Column
    private String request_message;

}
