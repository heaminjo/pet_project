package com.example.pet_back.domain.custom;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// 에러 시 반환될 DTO
public class ErrorResponse {
    private HttpStatus status;
    private String message;
    private String code;
}
