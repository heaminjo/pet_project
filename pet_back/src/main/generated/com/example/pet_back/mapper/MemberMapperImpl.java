package com.example.pet_back.mapper;

import com.example.pet_back.domain.admin.UserDetailResponseDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Member;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-03T16:09:48+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member toEntity(MemberRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

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

        MemberResponseDTO.MemberResponseDTOBuilder memberResponseDTO = MemberResponseDTO.builder();

        memberResponseDTO.grade( MemberMapper.gradeToString( member.getGrade() ) );
        memberResponseDTO.memberState( MemberMapper.gradeToString( member.getMemberState() ) );
        memberResponseDTO.id( member.getId() );
        memberResponseDTO.email( member.getEmail() );
        memberResponseDTO.name( member.getName() );
        memberResponseDTO.phone( member.getPhone() );
        memberResponseDTO.birth( member.getBirth() );
        memberResponseDTO.point( member.getPoint() );
        if ( member.getRegDate() != null ) {
            memberResponseDTO.regDate( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( member.getRegDate() ) );
        }
        memberResponseDTO.imageFile( member.getImageFile() );

        return memberResponseDTO.build();
    }

    @Override
    public UserDetailResponseDTO memberToUserDetail(Member member) {
        if ( member == null ) {
            return null;
        }

        UserDetailResponseDTO userDetailResponseDTO = new UserDetailResponseDTO();

        userDetailResponseDTO.setGrade( MemberMapper.gradeToString( member.getGrade() ) );
        userDetailResponseDTO.setMemberState( MemberMapper.gradeToString( member.getMemberState() ) );
        userDetailResponseDTO.setId( member.getId() );
        userDetailResponseDTO.setEmail( member.getEmail() );
        userDetailResponseDTO.setName( member.getName() );
        userDetailResponseDTO.setPhone( member.getPhone() );
        userDetailResponseDTO.setBirth( member.getBirth() );
        userDetailResponseDTO.setRegDate( member.getRegDate() );
        if ( member.getRole() != null ) {
            userDetailResponseDTO.setRole( member.getRole().name() );
        }
        userDetailResponseDTO.setPoint( member.getPoint() );

        return userDetailResponseDTO;
    }
}
