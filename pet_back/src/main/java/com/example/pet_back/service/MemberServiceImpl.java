package com.example.pet_back.service;


import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.GRADE;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.domain.address.AddressRequestDTO;
import com.example.pet_back.domain.address.AddressResponseDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.member.GradeResponseDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.member.UpdateMemberRequestDTO;
import com.example.pet_back.domain.member.UpdatePwRequestDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileUploadProperties fileUploadProperties;
    private final ServletContext servletContext;

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

        String imageFile = "";
        //등록한 사진이 없을 경우 기본 사진으로
        if (member.getImageFile() == null) imageFile = "dec6f8725b7669004655f3bbe7178d41.jpg";
        else imageFile = member.getImageFile();

        //디렉토리에서 파일 가져오기
        String realPath = fileUploadProperties.getUrl(); // http://localhost:8080/resources/webapp

        MemberResponseDTO dto = mapper.toDto(member);
        //해당파일은 MvcConfig에 매핑되어 이미지를 매핑
        dto.setImageFile(realPath + imageFile);

        log.info(dto.getImageFile());
//        String grade = member.getGrade().getGradeName();
        return ResponseEntity.ok(dto);
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

    //탈퇴 처리
    @Override
    @Transactional
    public ResponseEntity<?> memberWithdrawal(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."));
        member.setMemberState(MEMBERSTATE.WITHDRAWN);

        return ResponseEntity.ok(new ApiResponse<>(true, "탈퇴가 정상적으로 처리되었습니다."));
    }


    //마지막 로그인 날짜 업데이트
    @Override
    @Transactional
    public ResponseEntity<?> loginHistory(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        LocalDateTime lastLogin = member.getLastLogin();


        //만약 마지막 로그인이 null이거나 오늘보다 전날(isBefore) 이라면 누적
        if(lastLogin == null || lastLogin.toLocalDate().isBefore(LocalDate.now())){
            member.setLoginCount(member.getLoginCount() + 1);
        }
        //그리고 난 뒤 현재 시각으로 마지막 로그인 업데이트
        member.setLastLogin(LocalDateTime.now());

        //업그레이드 요구를 충족?
        boolean isUpgrade = false;

        //등급 기준 정검
        Map<GRADE,Integer> gradeStandard = Map.of(
                GRADE.NEWBIE ,3, //새싹 회원 = 다음 업그레이드는 3번이상
                GRADE.BLOSSOM,5,    //초급 회원 = 다음 업그레이드는 5번 이상
                GRADE.BREEZE,10,     //중급 회원 =다음 업그레이드는 로그인 10번 이상
                GRADE.FLAME,20     //상급 회원 =다음 업그레이드는 로그인 20번 이상
        );

        //현재 회원 등급에서 다음 등급으로 업그레이드 되기 위한 로그인 횟수(value)를 가져온다.
        //
        int userGrade = gradeStandard.get(member.getGrade());

        //만약 현제 등급에서 로그인 횟수 조건을 만족한다면 업그레이드 여부를 true로
        if(userGrade <= member.getLoginCount()) isUpgrade = true;

        return ResponseEntity.ok(new ApiResponse<Boolean>(true, isUpgrade,"마지막 로그인 업데이트 완료"));
    }

    //배송지 리스트
    @Override
    public List<AddressResponseDTO> addressList(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<Address> addressList = addressRepository.findAllByMemberId(id);

        //dto 변환
        List<AddressResponseDTO> response = addressList.stream().map(mapper::toAddressDTO).toList();

        return response;
    }

    //배송지 추가
    @Override
    public ResponseEntity<?> addressInsert(Long id, AddressRequestDTO dto) {
        Optional<Member> member = memberRepository.findById(id);

        if (member.isPresent()) {
            Address address = mapper.addressToEntity(dto);
            address.setMember(member.get());
            addressRepository.save(address);
            return ResponseEntity.ok(new ApiResponse<>(true, "배송지 저장 성공"));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(true, "배송지 저장 실패"));
        }
    }

    // 배송지 삭제
    @Override
    public ApiResponse addressDelete(Long addressId) {
        try {
            addressRepository.deleteById(addressId);
        } catch (Exception e) {
            return new ApiResponse(false, "배송지 삭제를 실패하였습니다.");
        }
        return new ApiResponse(true, "배송지 삭제가 완료되었습니다.");
    }

    //배송지 조회
    @Override
    public ApiResponse addressDetail(Long addressId) {
        Address address = addressRepository.findById(addressId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return new ApiResponse<AddressResponseDTO>(true, mapper.toAddressDTO(address), "배송지 조회 성공");
    }

    //배송지 수정
    @Transactional
    @Override
    public ApiResponse addressUpdate(Long userId, AddressRequestDTO dto) {
        Address address = addressRepository.findById(dto.getAddressId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Member member = memberRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        address.setAddress1(dto.getAddress1());
        address.setAddress2(dto.getAddress2());
        address.setAddressZip(dto.getAddressZip());
        address.setAddressName(dto.getAddressName());

        return new ApiResponse(true, "배송지 수정이 완료되었습니다.");
    }

}