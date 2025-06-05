package com.example.pet_back.mapper;

import com.example.pet_back.constant.GRADE;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    //dto -> entity
    public Member toEntity(MemberRequestDTO dto);
    //entity -> dto

    @Mapping(source = "grade", target = "grade", qualifiedByName = "gradeToString")
    @Mapping(source = "memberState", target = "memberState", qualifiedByName = "stateToString")
    public MemberResponseDTO toDto(Member member);

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

    @Named("regDateToString")
    public static String regDateToString(LocalDateTime regDate) {
        return regDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

}
