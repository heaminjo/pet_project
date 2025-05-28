package com.example.pet_back.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

// @JsonFormat(shape = JsonFormat.Shape.STRING) => 아래 @JsonProperty("SALE") 제거하고 일괄적용시
public enum GOODSSTATE {
    @JsonProperty("SALE")
    SALE,
    @JsonProperty("SOLDOUT")
    SOLDOUT,
    @JsonProperty("HIDDEN")
    HIDDEN
}
