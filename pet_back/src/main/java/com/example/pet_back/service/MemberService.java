package com.example.pet_back.service;

import com.example.pet_back.domain.address.AddressRequestDTO;
import com.example.pet_back.domain.address.AddressResponseDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.OrderResponseDTO;
import com.example.pet_back.domain.member.GradeResponseDTO;
import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.domain.member.UpdatePwRequestDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberService {
    public ResponseEntity<Boolean> emailCheck(String email);

    public ResponseEntity<?> selectOne(CustomUserDetails userDetails);

    public ResponseEntity<?> memberUpdate(CustomUserDetails userDetails, UpdateMemberRequestDTO dto);

    public ResponseEntity<?> memberPwUpdate(CustomUserDetails userDetails, UpdatePwRequestDTO dto);

//    public List<MemberResponseDTO> memberList();


    public ResponseEntity<?> memberWithdrawal(Long id);

    public ResponseEntity<?> loginHistory(Long id);

    public List<AddressResponseDTO> addressList(Long id);

    public ResponseEntity<?> addressInsert(Long id, AddressRequestDTO dto);

    public ApiResponse addressDelete(Long addressId);

    public ApiResponse addressDetail(Long addressId);

    public ApiResponse addressUpdate(Long userId, AddressRequestDTO dto);

}