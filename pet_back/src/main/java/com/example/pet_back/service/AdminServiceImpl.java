package com.example.pet_back.service;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.constant.ROLE;
import com.example.pet_back.domain.admin.GradeStatisticsDTO;
import com.example.pet_back.domain.admin.MemberStatisticsDTO;
import com.example.pet_back.domain.admin.UpgradeRequstDTO;
import com.example.pet_back.domain.admin.UserStateUpdateDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.Member;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2

public class AdminServiceImpl implements AdminService {

    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileUploadProperties fileUploadProperties;

    //관리자의 회원 조회
    @Override
    public ResponseEntity<?> adminUserDetail(String email) {
        //회원 존재 확인
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        MemberResponseDTO dto = mapper.toDto(member);
        dto.setImageFile("http://localhost:8080/uploads/" + member.getImageFile());
        return ResponseEntity.ok(dto);
    }

    //상태 수정
    @Override
    public ResponseEntity<?> userStateUpdate(UserStateUpdateDTO dto) {
        log.info(dto.toString());
        Member member = memberRepository.findById(dto.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        MEMBERSTATE memberstate = MEMBERSTATE.valueOf(dto.getState());
        member.setMemberState(memberstate);
        log.info(String.valueOf(member.getMemberState()));
        memberRepository.save(member);
        return ResponseEntity.ok(new ApiResponse<>(true, "회원 상태 업데이트 성공"));
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
            log.info("전체 조회 합니다.");
            page = memberRepository.findAllUser(pageable);
        } else if (dto.getType().equals("all")) {
            //검색 필터 전체로 할 경우
            log.info("전체 필터로 검색합니다. keyword => ");

            page = memberRepository.findAllSearchList("%" + dto.getKeyword() + "%", ROLE.USER, pageable);
        } else {
            //검색 필터 적용
            //검색 타입과 키워드를 포함하여 리스트를 가져온다.
            log.info("검색 필터를 적용하여 검색합니다.");
            page = memberRepository.findSearchList(dto.getType(), "%" + dto.getKeyword() + "%", ROLE.USER, pageable);
        }


        //페이지의 데이터를 List에 저장
        List<MemberResponseDTO> responseList = page.stream().map(mapper::toDto).toList();

        //반환할 ResponseDTO에 데이터들 저장
        PageResponseDTO<MemberResponseDTO> response = new PageResponseDTO<>(responseList, dto.getPage(), dto.getSize(), page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious()
        );
        return response;
    }

    //회원 통계

    @Override
    public MemberStatisticsDTO memberStatistics() {
        Long totalUser = memberRepository.count(); //전체 수
        Long todayUser = memberRepository.todayUserCount(); //오늘 로그인
        Long male = memberRepository.MaleCount(); //남자수
        Long female = totalUser - male; //여자수
        List<Object[]> join = memberRepository.userWeekJoin(); //7일 회원가입 통계
        log.info(join.toString());
        //회원가입 통계 map으로 변환
        Map<String, Long> map = join.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> ((Number) row[1]).longValue(),
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        return new MemberStatisticsDTO(totalUser, 0L, todayUser, male, female, map);
    }

    //등급 통계
    @Override
    public Map<String, GradeStatisticsDTO> gradeStatistics() {
        List<Object[]> list = memberRepository.gradeStatistics();


        //map으로 변환
        Map<String, GradeStatisticsDTO> map = list.stream().collect(Collectors.toMap(
                row -> (String) row[0],
                row -> new GradeStatisticsDTO(((Number) row[1]).longValue(), ((Number) row[2]).doubleValue(), ((Number) row[3]).doubleValue()),
                (existing, replacement) -> existing,
                LinkedHashMap::new
        ));

        return map;
    }

    @Override
    public List<MemberResponseDTO> userBestList(String grade) {
        log.info(grade);
        List<Member> list = memberRepository.userBestList(grade);
        log.info(list.stream().toList());
        List<MemberResponseDTO> response = list.stream().map(mapper::toDto).toList();

        return response;
    }


    //등급 업그레이드
    @Override
    @Transactional
    public ApiResponse upgradeGrade(UpgradeRequstDTO dto) {
        memberRepository.updateGrade(dto.getNextGrade(), dto.getUserId());
        Member member = memberRepository.findById(dto.getUserId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return new ApiResponse<>(true, member.getName() + "님의 등급이 " + dto.getNextGrade() + "등급으로 업그레이드 되었습니다.");
    }
}
