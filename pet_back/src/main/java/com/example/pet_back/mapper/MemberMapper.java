package com.example.pet_back.mapper;

import com.example.pet_back.constant.GRADE;
import com.example.pet_back.domain.login.LoginResponseDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    //dto -> entity
    public Member toEntity(MemberRequestDTO dto);
    //entity -> dto

    @Mapping(source = "grade" ,target = "grade",qualifiedByName = "gradeToString" )
    public MemberResponseDTO toDto(Member member);
    @Named("gradeToString")
    public static String gradeToString(GRADE grade){
        return grade.getGradeName();
    }
}
