package com.example.pet_back.service;


import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.custom.ErrorResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.login.LoginResponseDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.antlr.v4.runtime.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    private final AddressRepository addressRepository;

    //이메일 중복 검사
    @Override
    public ResponseEntity<Boolean> emailCheck(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        log.info("중복 ?:"+member.isPresent());
        return member.isPresent() ? ResponseEntity.ok(true) : ResponseEntity.ok(false);
    }

    @Override
    public ResponseEntity<?> selectOne(UserDetails userDetails) {
        Member member = memberRepository.findById().orElseThrow(()-> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        return ResponseEntity.ok(mapper.toDto(member));
    }
}