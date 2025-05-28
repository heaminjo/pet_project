package com.example.pet_back.mapper;

import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.member.MemberResponseDTO.MemberResponseDTOBuilder;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.Member.MemberBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-28T14:07:02+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member toEntity(MemberRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        MemberBuilder member = Member.builder();

        member.email( dto.getEmail() );
        member.password( dto.getPassword() );
        member.name( dto.getName() );
        member.phone( dto.getPhone() );
        member.birth( dto.getBirth() );

        return member.build();
    }

    @Override
    public MemberResponseDTO toDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDTOBuilder memberResponseDTO = MemberResponseDTO.builder();

        memberResponseDTO.grade( MemberMapper.gradeToString( member.getGrade() ) );
        memberResponseDTO.email( member.getEmail() );
        memberResponseDTO.name( member.getName() );
        memberResponseDTO.phone( member.getPhone() );
        memberResponseDTO.birth( member.getBirth() );
        memberResponseDTO.point( member.getPoint() );
        memberResponseDTO.image_file( member.getImage_file() );

        return memberResponseDTO.build();
    }
}
