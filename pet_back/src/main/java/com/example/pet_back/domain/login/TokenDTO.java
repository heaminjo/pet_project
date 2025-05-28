package com.example.pet_back.domain.login;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TokenDTO {
    private String memberName;
    private String role;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiresln;
}
