package com.example.pet_back.domain.login.member;

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
    private LocalDateTime birth;
    private String address1;
    private String address2;
    private String addressZip;
    private String image_file;
}
