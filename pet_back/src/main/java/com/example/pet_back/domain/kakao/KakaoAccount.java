package com.example.pet_back.domain.kakao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

//동의여부
@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoAccount {

    //프로필 정보 제공 동의 여부
    @JsonProperty("profile_needs_agreement")
    public Boolean isProfileAgree;

    //닉네임 제공 동의 여부
    @JsonProperty("profile_nickname_needs_agreement")
    public Boolean isNickNameAgree;

    //프로필 사진 제공 동의 여부
    @JsonProperty("profile_image_needs_agreement")
    public Boolean isProfileImageAgree;

    //사용자 프로필 정보
    @JsonProperty("profile")
    public Profile profile;

}
