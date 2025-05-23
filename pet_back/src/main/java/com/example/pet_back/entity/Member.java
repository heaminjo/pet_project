package com.example.pet_back.entity;


import com.example.pet_back.constant.GRADE;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.constant.ROLE;
import jakarta.persistence.*;
import lombok.*;

//부모 클래스 필드값도 동일 하다.
    @EqualsAndHashCode(callSuper = true)
    @Entity
    @Table(name="member")
    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class Member extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id" ,nullable = false)
    private Long id;

    @Column(nullable = false,length = 50,unique = true)
    private String email;       //이메일

    @Column(nullable = false,updatable = false,length = 100)
    private String password;    //비밀번호

    @Column(nullable = false,length = 10)
    private String name;        //이름

    @Column(nullable = false,length = 11)
    private String phone;       //폰번호

    @Column(nullable = false,length = 8)
    private String birth; //생년월일

    private String image_file; //프로필 이미지

    //등급(첫 회원 가입 시 NUEBIE)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private GRADE grade = GRADE.NEWBIE;

    //회원 권한(ADMIN,USER,)
    //String으로 테이블에 저장하며 Builder.Default로 처음 생성 시 USER 로 초기화
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ROLE role = ROLE.USER;

    //회원 상태(정상회원,탈퇴회원,정지회원)
    //생성 시 초기값은 정상회원이다.
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private MEMBERSTATE memberState = MEMBERSTATE.ACTIVE;


    } //class
