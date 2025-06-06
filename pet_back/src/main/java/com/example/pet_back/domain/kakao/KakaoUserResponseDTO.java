package com.example.pet_back.domain.kakao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashMap;

@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoUserResponseDTO {
    //회원 번호
    @JsonProperty("id")
    public Long id;

    //자동 연결 설정을 비활성화 한 경우만 존재
    @JsonProperty("has_signed_up")
    public Boolean hasSignedUp;

    //서비스에 연결 완료된 시간
    @JsonProperty("connected_at")
    public Date connectedAt;

    //간편 가입을 통해 로그인한 시각
    @JsonProperty("synched_at")
    public Date synchedAt;

    //사용자 프로퍼티
    @JsonProperty("properties")
    public HashMap<String, String> properties;

    //카카오 계정 정보
    @JsonProperty("kakao_account")
    public KakaoAccount kakaoAccount;

    //uuid 등 추가 정보
    @JsonProperty("for_partner")
    public Partner partner;
}
