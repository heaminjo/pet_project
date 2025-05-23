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
    date = "2025-05-23T10:43:09+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.13.jar, environment: Java 17.0.12 (Azul Systems, Inc.)"
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

        memberResponseDTO.email( member.getEmail() );
        memberResponseDTO.name( member.getName() );
        memberResponseDTO.phone( member.getPhone() );
        memberResponseDTO.birth( member.getBirth() );
        memberResponseDTO.image_file( member.getImage_file() );

        return memberResponseDTO.build();
    }
}
