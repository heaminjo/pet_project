package com.example.pet_back.service;

import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.custom.ErrorResponse;
import com.example.pet_back.domain.login.LoginRequestDTO;
import com.example.pet_back.domain.member.MemberRequestDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2

public class AuthServiceImpl implements  AuthService{
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final MemberMapper mapper;

    //로그인
    @Override
    public ResponseEntity<?> login(LoginRequestDTO dto) {
        //email과 pw기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),dto.getPassword()
                );

        //실제 검증(비밀번호 체크)
        return null;
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
}
