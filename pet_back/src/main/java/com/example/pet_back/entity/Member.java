package com.example.pet_back.entity;


import com.example.pet_back.constant.GENDER;
import com.example.pet_back.constant.GRADE;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.constant.ROLE;
import com.example.pet_back.domain.login.SocialUpdateDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

//부모 클래스 필드값도 동일 하다.
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "member")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long id;

    @Column(length = 50, unique = true)
    private String email;       //이메일

    @Column(updatable = false, length = 100)
    private String password;    //비밀번호

    @Column(length = 10)
    private String name;        //이름

    @Column(length = 11)
    private String phone;       //폰번호

    @Column(length = 8)
    private String birth; //생년월일

    private double point;

    private String imageFile = "1e1daeb3-7968-40d1-93f2-09b5ea794ae0.jpg"; //프로필 이미지

    @Column(name = "last_login")
    private LocalDateTime lastLogin; //마지막 로그인 시간

    //성별
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum('MALE','FEMALE')")
    private GENDER gender;

    //등급(첫 회원 가입 시 NUEBIE)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private GRADE grade = GRADE.NEWBIE;

    //회원 권한(ADMIN,USER,)
    //String으로 테이블에 저장하며 Builder.Default로 처음 생성 시 USER 로 초기화
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ROLE role = ROLE.USER;


    private int loginCount = 0;     //로그인 횟수
    private int totalPurchaseCount = 0; //총 구매 횟수
    private int totalPurchasePrice = 0; //총 구매가격


    //회원 상태(정상회원,탈퇴회원,정지회원)
    //생성 시 초기값은 정상회원이다.
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private MEMBERSTATE memberState = MEMBERSTATE.ACTIVE;

    private Long kakaoId;

    //카카오로 회원가입
    public Member(Long kakaoId, String name, String imageFile) {
        this.kakaoId = kakaoId;
        this.name = name;
        this.imageFile = imageFile;
        this.role = ROLE.USER;
        this.grade = GRADE.NEWBIE;
        this.memberState = MEMBERSTATE.ACTIVE;
    }

    public Member setSocial(Member m, SocialUpdateDTO dto) {
        m.setEmail(dto.getEmail());
        m.setPhone(dto.getPhone());
        m.setBirth(dto.getBirth());
        m.setGender(dto.getGender());
        m.setMemberState(MEMBERSTATE.ACTIVE);
        return m;
    }
} //class
