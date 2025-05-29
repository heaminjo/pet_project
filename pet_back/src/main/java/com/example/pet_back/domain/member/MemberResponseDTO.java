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
    private Long memberId;
    private String email;
    private String name;
    private String phone;
    private String birth;
    private double point;
    private String grade;
    private String regDate;
    private String memberState;
    private String image_file;
}
