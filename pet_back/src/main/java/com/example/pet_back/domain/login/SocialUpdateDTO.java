package com.example.pet_back.domain.login;

import com.example.pet_back.constant.GENDER;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//소셜 로그인 필수정보 업데이트 DTO
public class SocialUpdateDTO {
    @NotBlank(message = "이메일은 필수 항목입니다.")
    private String email;

    @NotBlank(message = "휴대번호는 필수 항목입니다.")
    private String phone;

    @NotBlank(message = "생년월일은 필수 항목입니다.")
    private String birth;

    @NotNull
    private GENDER gender;

    @NotBlank(message = "주소는 필수 항목입니다.")
    private String address1;

    private String address2;

    @NotBlank(message = "우편번호는 필수 항목입니다.")
    private String addressZip;
}
