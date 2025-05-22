package com.example.pet_back.domain.member;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor @Builder

public class MemberRequestDTO {

    @NotBlank(message = "이메일은 필수 항목입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 항목입니다.")
    private String password;

    @NotBlank(message = "이름은 필수 항목입니다.")
    private String name;

    @NotBlank(message = "휴대번호는 필수 항목입니다.")
    private String phone;

    @NotBlank(message = "생년월일은 필수 항목입니다.")
    private String birth;

    @NotBlank(message = "주소는 필수 항목입니다.")
    private String address1;

    private String address2;

    @NotBlank(message = "우편번호는 필수 항목입니다.")
    private String addressZip;

}
