package com.example.pet_back.service;


import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.MEMBERSTATE;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


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
        if (member.getImageFile() == null) imageFile = "1e1daeb3-7968-40d1-93f2-09b5ea794ae0";
        else imageFile = member.getImageFile();
        //외부디렉토리에서 파일 가져오기
        MemberResponseDTO dto = mapper.toDto(member);
        dto.setImageFile("http://localhost:8080/uploads/" + imageFile);
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

    //이미지 변경
    @Override
    public ResponseEntity<?> memberUploadImage(Long id, MultipartFile file) {
        //비어있는지 확인
        if (file.isEmpty()) return null;

        //값 제대로 받아왔는지 체크
        String originalName = file.getOriginalFilename(); //apple.png
        String extension = originalName.substring(originalName.lastIndexOf("."));// .pag
        String uuid = UUID.randomUUID().toString(); //고유한 식별자를 랜덤으로 생성
        String saveFileName = uuid + extension; //저장할 파일 변수이름 -> 고유식별자.png
        String saveDirPath = fileUploadProperties.getPath(); // C:/uploads
        String savePath = saveDirPath + saveFileName;//C:/uploads/고유 식별자.png
        log.info("새로 등록할 이미지 파일 => {}", originalName + "\n" + extension + "\n" + uuid + "\n" + saveFileName + "\n" + savePath);

        try {
            File saveDir = new File(saveDirPath); //저장할 디렉토리 생성(C:/uploads)
            //만얃 C:/uploads 이 경로가 없다면 디렉토리를 생성한다.
            if (!saveDir.exists()) {
                saveDir.mkdir();
            }
            //실제 파일 저장 (multipart파일을 File 객체로 복사)
            file.transferTo(new File(savePath));

            //DB에 저장
            Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            member.setImageFile(saveFileName);
            memberRepository.save(member);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        String imageURL = fileUploadProperties.getUrl() + saveFileName;
        return ResponseEntity.ok(new ApiResponse<String>(true, imageURL, "이미지 변경이 완료되었습니다."));

    }

    //마지막 로그인 날짜 업데이트
    @Override
    @Transactional
    public ResponseEntity<?> loginHistory(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        member.setLastLogin(LocalDateTime.now());

        return ResponseEntity.ok(new ApiResponse<>(true, "마지막 로그인 업데이트 완료"));
    }
}