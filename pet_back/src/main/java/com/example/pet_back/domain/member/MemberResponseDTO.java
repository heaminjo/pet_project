package com.example.pet_back.domain.member;

import com.example.pet_back.constant.GRADE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor @NoArgsConstructor @Builder
public class MemberResponseDTO {
    private String email;
    private String name;
    private String phone;
    private String birth;
    private double point;
    private String grade;
    private String image_file;
}
