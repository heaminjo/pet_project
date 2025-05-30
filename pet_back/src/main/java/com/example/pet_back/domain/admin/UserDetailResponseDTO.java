package com.example.pet_back.domain.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
//관리자 회원 조회(컬럼 더 추가 예정)
public class UserDetailResponseDTO {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String birth;
    private LocalDateTime regDate;
    private String grade;
    private String role;
    private double point;
    private String memberState;

}
