package com.example.pet_back.service;


import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.domain.member.UpdatePwRequestDTO;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    //이메일 중복 검사
    @Override
    public ResponseEntity<Boolean> emailCheck(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        log.info("중복 ?:" + member.isPresent());
        return member.isPresent() ? ResponseEntity.ok(true) : ResponseEntity.ok(false);
    }

    //회원 조회
    @Override
    public ResponseEntity<?> selectOne(CustomUserDetails userDetails) {
        //유저 details에서 id 가져와 회원을 가져온다.
        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));


        String grade = member.getGrade().getGradeName();
        return ResponseEntity.ok(mapper.toDto(member));
    }

    @Override
    @Transactional
    public ResponseEntity<?> memberUpdate(CustomUserDetails userDetails, UpdateMemberRequestDTO dto) {
        Optional<Member> member = memberRepository.findById(userDetails.getMember().getId());

        if (member.isEmpty()) return ResponseEntity.status((HttpStatus.NOT_FOUND)).body("존재하지 않는 회원 입니다.");
        Member m = member.get();

        m.setName(dto.getName());
        m.setBirth(dto.getBirth());
        m.setPhone(dto.getPhone());
        return ResponseEntity.ok(new ApiResponse<String>(true, m.getName(), "회원수정이 완료되었습니다."));
    }

    //비밀번호 변경

    @Override
    @Transactional
    public ResponseEntity<?> memberPwUpdate(CustomUserDetails userDetails, UpdatePwRequestDTO dto) {
        //존재 여부 확인
        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."));

        //비밀번호 검사
        //일치하면 변경
        if (passwordEncoder.matches(dto.getPassword(), member.getPassword())) {
            log.info("비밀번호가 일치 합니다.");
//            member.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            memberRepository.updatePassword(userDetails.getMember().getId(), passwordEncoder.encode(dto.getNewPassword()));

//            memberRepository.save(member);
            return ResponseEntity.ok(new ApiResponse<>(true, "비밀번호 수정에 성공하였습니다."));
        } else {
            log.info("비밀번호가 불일치 합니다.");
            return ResponseEntity.ok(new ApiResponse<>(false, "비밀번호 수정에 실패하였습니다."));
        }
    }

    //회원 리스트
    @Override
    public List<MemberResponseDTO> memberList() {
        List<Member> list = memberRepository.findAll();
        List<MemberResponseDTO> responseList = list.stream().map(mapper::toDto).toList();

        return responseList;
    }

    //회원 검색 리스트
    @Override
    public List<MemberResponseDTO> memberSearchList(String type, String keyword) {
        List<Member> list = memberRepository.findSearchList(type, "%" + keyword + "%");
        log.info("검색 리스트 => " + list.toString());
        List<MemberResponseDTO> responseList = list.stream().map(mapper::toDto).toList();

        return responseList;
    }
}