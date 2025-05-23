package com.example.pet_back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor @AllArgsConstructor
public class RefreshToken {
    @Id
    private Long userId;

    @Column(nullable = false)
    private String token;
    private Long expiration; //만료 시간


}
