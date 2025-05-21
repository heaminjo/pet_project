package com.example.pet_back.mapper;

import com.example.pet_back.domain.login.member.MemberRequestDTO;
import com.example.pet_back.domain.login.member.MemberResponseDTO;
import com.example.pet_back.domain.login.member.MemberResponseDTO.MemberResponseDTOBuilder;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.Member.MemberBuilder;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-21T14:14:07+0900",
    comments = "version: 1.4.2.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20241112-0530, environment: Java 21.0.6 (Eclipse Adoptium)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member toEntity(MemberRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        MemberBuilder member = Member.builder();

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

        MemberResponseDTOBuilder memberResponseDTO = MemberResponseDTO.builder();

        if ( member.getBirth() != null ) {
            memberResponseDTO.birth( LocalDateTime.parse( member.getBirth() ) );
        }
        memberResponseDTO.email( member.getEmail() );
        memberResponseDTO.image_file( member.getImage_file() );
        memberResponseDTO.name( member.getName() );
        memberResponseDTO.phone( member.getPhone() );

        return memberResponseDTO.build();
    }
}
