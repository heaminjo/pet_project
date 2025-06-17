package com.example.pet_back.mapper;

import com.example.pet_back.domain.address.AddressRequestDTO;
import com.example.pet_back.domain.address.AddressResponseDTO;
import com.example.pet_back.domain.admin.UserDetailResponseDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-13T17:07:04+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
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
        member.gender( dto.getGender() );

        return member.build();
    }

    @Override
    public Address addressToEntity(AddressRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Address address = new Address();

        address.setAddressId( dto.getAddressId() );
        address.setAddress1( dto.getAddress1() );
        address.setAddress2( dto.getAddress2() );
        address.setAddressZip( dto.getAddressZip() );
        address.setAddrType( dto.getAddrType() );
        address.setAddressName( dto.getAddressName() );

        return address;
    }

    @Override
    public AddressResponseDTO toAddressDTO(Address address) {
        if ( address == null ) {
            return null;
        }

        AddressResponseDTO addressResponseDTO = new AddressResponseDTO();

        addressResponseDTO.setAddrType( MemberMapper.addrToString( address.getAddrType() ) );
        addressResponseDTO.setAddressId( address.getAddressId() );
        addressResponseDTO.setAddressName( address.getAddressName() );
        addressResponseDTO.setAddress1( address.getAddress1() );
        addressResponseDTO.setAddress2( address.getAddress2() );
        addressResponseDTO.setAddressZip( address.getAddressZip() );

        return addressResponseDTO;
    }

    @Override
    public MemberResponseDTO toDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDTO.MemberResponseDTOBuilder memberResponseDTO = MemberResponseDTO.builder();

        memberResponseDTO.lastLogin( MemberMapper.lastLoginToString( member.getLastLogin() ) );
        memberResponseDTO.regDate( MemberMapper.regDateToString( member.getRegDate() ) );
        memberResponseDTO.grade( MemberMapper.gradeToString( member.getGrade() ) );
        memberResponseDTO.memberState( MemberMapper.gradeToString( member.getMemberState() ) );
        memberResponseDTO.id( member.getId() );
        memberResponseDTO.email( member.getEmail() );
        memberResponseDTO.name( member.getName() );
        memberResponseDTO.phone( member.getPhone() );
        memberResponseDTO.birth( member.getBirth() );
        memberResponseDTO.point( member.getPoint() );
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
