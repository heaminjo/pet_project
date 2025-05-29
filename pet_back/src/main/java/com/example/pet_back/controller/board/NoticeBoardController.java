package com.example.pet_back.controller.board;

import com.example.pet_back.domain.board.NoticeBoardDTO;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.service.board.NoticeBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class NoticeBoardController {

    private final NoticeBoardService noticeBoardService;
    private final TokenProvider tokenProvider;

    // 토큰에서 member_id 추출하는 유틸 함수
    private Long extractMemberIdFromToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authorizationHeader.substring(7); // "Bearer " 이후만 추출
        return tokenProvider.getUserId(token);
    }

    //** NoticeBoardList (게시글 목록)
    @GetMapping("/noticeboardList")
    public ResponseEntity<?> selectList() {
        List<NoticeBoardDTO> list = noticeBoardService.selectList();
        return ResponseEntity.ok(list != null ? list : new ArrayList<>());
    } //selectList()

    //** NoticeBoardDetail


    //** NoticeInsertBoard
    @PostMapping("insertNoticeBoard")
    public ResponseEntity<?> insertNoticeBoard(@RequestBody NoticeBoardDTO dto,
                                               @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        Long memberId = extractMemberIdFromToken(authorizationHeader);
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }
        dto.setMember_id(memberId.intValue()); // BoardDTO에 member_id 세팅 (Long→int 변환)
        int result = noticeBoardService.insertNoticeBoard(dto);
        if (result > 0) {
            return ResponseEntity.ok("등록 성공");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록 실패");
        }
    }

} //class
