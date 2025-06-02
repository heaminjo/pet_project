package com.example.pet_back.mapper;

import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Member;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T08:56:25+0900",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member toEntity(MemberRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.birth( dto.getBirth() );
        member.email( dto.getEmail() );
        member.name( dto.getName() );
        member.password( dto.getPassword() );
        member.phone( dto.getPhone() );

        return member.build();
    }

    @Override
    public MemberResponseDTO toDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDTO.MemberResponseDTOBuilder memberResponseDTO = MemberResponseDTO.builder();

        memberResponseDTO.grade( MemberMapper.gradeToString( member.getGrade() ) );
        memberResponseDTO.memberState( MemberMapper.gradeToString( member.getMemberState() ) );
        memberResponseDTO.birth( member.getBirth() );
        memberResponseDTO.email( member.getEmail() );
        memberResponseDTO.image_file( member.getImage_file() );
        memberResponseDTO.name( member.getName() );
        memberResponseDTO.phone( member.getPhone() );
        memberResponseDTO.point( member.getPoint() );
        if ( member.getRegDate() != null ) {
            memberResponseDTO.regDate( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( member.getRegDate() ) );
        }

        return memberResponseDTO.build();
    }
}
