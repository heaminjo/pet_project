package com.example.pet_back.service;


import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.custom.ErrorResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.login.LoginResponseDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.antlr.v4.runtime.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    //비번 암호화
    private final PasswordEncoder passwordEncoder;
    private final MemberMapper mapper;
    private final AddressRepository addressRepository;
    private final TokenProvider tokenProvider;

    //로그인
    @Override
    public ResponseEntity<?> login(LoginRequestDTO dto) {
        Optional<Member> member =  memberRepository.findByEmail(dto.getEmail());
        if(member.isPresent() && passwordEncoder.matches(dto.getPassword(),member.get().getPassword())){

            //비밀번호까지 전부 성공 시 토큰 생성

            //로그인 시 반환
            return null;
        }else{
            log.info("로그인 실패");
            return ResponseEntity.ok(new ApiResponse<LoginRequestDTO>(false,dto,"로그인에 실패하였습니다."));
        }
    }

    //회원가입
    @Override
    public ResponseEntity<?> join(MemberRequestDTO dto) {

        try {
            dto.setPassword(passwordEncoder.encode(dto.getPassword()));
            log.info("비밀번호 암호화 완료 => " + dto.getPassword());

            //회원을 저장하고 member 엔티티를 반환
            Member member = memberRepository.save(mapper.toEntity(dto));

            //address 생성 후 저장
            addressRepository.save(new Address(member, dto.getAddress1(), dto.getAddress2(), dto.getAddressZip()));
            log.info("저장된 회원의 식별자 => " + member.getId());
            return ResponseEntity.ok(new ApiResponse<>(true, "회원가입에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST,"회원가입에 실패하였습니다.","400"));
        }
    }

    //이메일 중복 검사
    @Override
    public ResponseEntity<Boolean> emailCheck(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        log.info("중복 ?:"+member.isPresent());
        return member.isPresent() ? ResponseEntity.ok(true) : ResponseEntity.ok(false);
    }
}