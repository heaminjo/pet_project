package com.example.pet_back.service;


import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.domain.member.UpdatePwRequestDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    //회원 검색 리스트
    @Override
    public PageResponseDTO<MemberResponseDTO> memberSearchList(PageRequestDTO dto) {

        //정렬(최신순,오래된 순)
        Sort sort = dto.getSortBy().equals("desc") ?
                Sort.by("regDate").descending()
                : Sort.by("regDate").ascending();

        //요청 페이지, 출력 개수,정렬을 담은 Pageable 객체
        Pageable pageable = PageRequest.of(dto.getPage(), dto.getSize(), sort);

        Page<Member> page;
        //키워드의 여부
        if (dto.getKeyword().isEmpty()) {
            //검색 x 전체 조회
            page = memberRepository.findAll(pageable);
        } else {
            //검색 타입과 키워드를 포함하여 리스트를 가져온다.
            page = memberRepository.findSearchList(dto.getType(), "%" + dto.getKeyword() + "%", pageable);
        }


        //페이지의 데이터를 List에 저장
        List<MemberResponseDTO> responseList = page.stream().map(mapper::toDto).toList();

        //반환할 ResponseDTO에 데이터들 저장
        PageResponseDTO<MemberResponseDTO> response = new PageResponseDTO<>(responseList, dto.getPage(), dto.getSize(), page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious()
        );
        return response;
    }
}