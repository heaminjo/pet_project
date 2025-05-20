package com.example.pet_back.domain.login.custom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class ApiResponse<T> {
    private boolean success; //성공 / 실패 여부
    private T data; //응답 데이터(타입은 미정)
    private String message;

    //반환데이터는 없고 성공 실패 여부만 저장할 생성자
    public ApiResponse(boolean success,String message ) {
        this.message = message;
        this.success = success;
    }
}
