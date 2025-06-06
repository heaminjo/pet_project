package com.example.pet_back.domain.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//카카오로부터 받은 code를 카카오에 토큰 발급 요청을 하여
//사용자 정보가 담겨있는 토큰을 받아 담는 DTO
@Data
@AllArgsConstructor
@NoArgsConstructor
public class KakaoTokenResponseDTO {

    @JsonProperty("token_type")
    public String tokenType;  //Bearer
    @JsonProperty("access_token")
    public String accessToken;
    @JsonProperty("id_token")
    public String idToken;
    @JsonProperty("expires_in")
    public Integer expiresIn;
    @JsonProperty("refresh_token")
    public String refreshToken;
    @JsonProperty("refresh_token_expires_in")
    public Integer refreshTokenExpiresIn;
    @JsonProperty("scope")
    public String scope;
}
