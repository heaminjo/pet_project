package com.example.pet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

// Cart 의 Id클래스 (복합키) , @IdClass
// 식별자 클래스(Id클래스) 변수명과 엔티티 변수명 일치해야 함.

@Data
@AllArgsConstructor
@NoArgsConstructor // 필수
public class CartId implements Serializable { // Serializable 상속

    private static final long serialVersionUID = 1L;

    // 필드로는 식별자의 역할을 하는 필드만 포함되어 있어야 함
    private Long member_id;
    private Long goods_id;

}
