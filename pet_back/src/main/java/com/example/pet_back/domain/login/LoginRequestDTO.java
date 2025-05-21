package com.example.pet_back.domain.login;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {

    @NotBlank(message = "이메일은 필수 항목 입니다.")
    private String email;
    @NotBlank(message = "비밀번호는 필수 항목 입니다.")
    private String password;
}
