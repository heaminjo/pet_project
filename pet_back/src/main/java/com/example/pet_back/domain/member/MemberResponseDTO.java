package com.example.pet_back.domain.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDTO {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String birth;
    private double point;
    private String grade;
    private String regDate;
    private String memberState;
    private String imageFile;
    private String lastLogin;
    private int cartCount;
    private int loginCount ;     //로그인 횟수
    private int totalPurchaseCount ; //총 구매 횟수
    private int totalPurchasePrice; //총 구매가격
}
