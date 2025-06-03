package com.example.pet_back.domain.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMemberRequestDTO {
    private String name;
    private String birth;
    private String phone;
    private MultipartFile image_file;
}
