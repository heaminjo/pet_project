package com.example.pet_back.mapper;

import com.example.pet_back.constant.GRADE;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.domain.admin.UserDetailResponseDTO;
import com.example.pet_back.domain.login.SocialUpdateDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Member;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    //dto -> entity
    public Member toEntity(MemberRequestDTO dto);

    void updateFromSocialDto(SocialUpdateDTO dto, @MappingTarget Member member);

    //entity -> dto
//grade 한글로
    @Named("gradeToString")
    public static String gradeToString(GRADE grade) {
        return grade.getGradeName();
    }

    //state 한글로
    @Named("stateToString")
    public static String gradeToString(MEMBERSTATE state) {
        return state.getGradeName();
    }

    //생성 날짜
    @Named("regDateToString")
    public static String regDateToString(LocalDateTime regDate) {
        return regDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    //마지막 로그인
    @Named("lastLoginToString")
    public static String lastLoginToString(LocalDateTime lastLogin) {
        if (lastLogin == null) {
            return null;
        }
        return lastLogin.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    @Mapping(source = "lastLogin", target = "lastLogin", qualifiedByName = "lastLoginToString")
    @Mapping(source = "regDate", target = "regDate", qualifiedByName = "regDateToString")
    @Mapping(source = "grade", target = "grade", qualifiedByName = "gradeToString")
    @Mapping(source = "memberState", target = "memberState", qualifiedByName = "stateToString")
    public MemberResponseDTO toDto(Member member);

    @Mapping(source = "grade", target = "grade", qualifiedByName = "gradeToString")
    @Mapping(source = "memberState", target = "memberState", qualifiedByName = "stateToString")
    public UserDetailResponseDTO memberToUserDetail(Member member);

}
