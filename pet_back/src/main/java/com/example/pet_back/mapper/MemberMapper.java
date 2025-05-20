package com.example.pet_back.mapper;

import com.example.pet_back.domain.login.member.MemberRequestDTO;
import com.example.pet_back.domain.login.member.MemberResponseDTO;
import com.example.pet_back.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    //dto -> entity
    public Member toEntity(MemberRequestDTO dto);

    //entity -> dto
    public MemberResponseDTO toDto(Member member);
}
