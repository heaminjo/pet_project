package com.example.pet_back.mapper;

import com.example.pet_back.domain.login.LoginResponseDTO;
import com.example.pet_back.domain.login.LoginResponseDTO.LoginResponseDTOBuilder;
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
    date = "2025-05-21T17:47:46+0900",
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
        if ( member.getBirth() != null ) {
            memberResponseDTO.birth( LocalDateTime.parse( member.getBirth() ) );
        }
        memberResponseDTO.image_file( member.getImage_file() );

        return memberResponseDTO.build();
    }

    @Override
    public LoginResponseDTO toLoginDto(Member member) {
        if ( member == null ) {
            return null;
        }

        LoginResponseDTOBuilder loginResponseDTO = LoginResponseDTO.builder();

        loginResponseDTO.id( member.getId() );
        loginResponseDTO.name( member.getName() );

        return loginResponseDTO.build();
    }
}
