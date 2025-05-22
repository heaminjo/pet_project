package com.example.pet_back.domain.login;

import lombok.*;

import javax.management.relation.Role;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    //토큰 추가
    private String token;
    private Long id;
    private String name;
    private Role role;
}
