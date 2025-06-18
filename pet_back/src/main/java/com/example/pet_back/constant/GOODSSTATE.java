package com.example.pet_back.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

// @JsonFormat(shape = JsonFormat.Shape.STRING) => 아래 @JsonProperty("SALE") 제거하고 일괄적용시
public enum GOODSSTATE {
    SALE("정상 판매"),
    SOLDOUT("품절"),
    HIDDEN("숨김");

    private final String gradeName;

    GOODSSTATE(String gradeName) {
        this.gradeName = gradeName;
    }
    public String getGradeName() {
        return gradeName;
    }
}
