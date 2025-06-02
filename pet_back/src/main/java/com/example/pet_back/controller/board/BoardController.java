package com.example.pet_back.controller.board;

import com.example.pet_back.domain.board.BoardDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
    //d
    private final BoardService boardService;
    private final TokenProvider tokenProvider;


    // 토큰에서 member_id 추출하는 유틸 함수
    private Long extractMemberIdFromToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authorizationHeader.substring(7); // "Bearer " 이후만 추출
        return tokenProvider.getUserId(token);
    }


    //** BoardList (게시글 목록)
    @GetMapping("/boardList/{category}")
    public ResponseEntity<?> selectList(@PathVariable("category") String category,
                                        @RequestParam(value = "page", defaultValue = "0") int page,
                                        @RequestParam(value = "size", defaultValue = "3") int size) {
        //List<BoardDTO> list = boardService.selectList(category);
        //return ResponseEntity.ok(list != null ? list : new ArrayList<>());
        PageRequestDTO pageRequestDTO = new PageRequestDTO(page, size, null, null, null);
        PageResponseDTO<BoardDTO> responseDTO = boardService.selectList(category, pageRequestDTO);
        return ResponseEntity.ok(responseDTO);
    } //selectList()


    //** BoardDetail (게시글 내용)
    @GetMapping("/boardDetail/{category}/{board_id}")
    public ResponseEntity<?> selectOne(@PathVariable("board_id") int board_id,
                                       @PathVariable("category") String category) {

        BoardDTO dto = boardService.selectOne(category, board_id);

        if (dto != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다");
        }
    } //selectOne


    //** BoardInsert 게시글 등록
    @PostMapping("/insertBoard/{category}")
    public ResponseEntity<?> insertBoard(@PathVariable("category") String category,
                                         @RequestBody BoardDTO dto,
                                         @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        Long memberId = extractMemberIdFromToken(authorizationHeader);
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }
        dto.setMember_id(memberId.intValue()); // BoardDTO에 member_id 세팅 (Long→int 변환)
        int result = boardService.insertBoard(dto);
        if (result > 0) {
            return ResponseEntity.ok("등록 성공");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록 실패");
        }
    } //insertBoard


    //** updateboard 게시글 수정
    @PutMapping("/updateboard/{id}")
    public ResponseEntity<?> updateBoard(
            @PathVariable("id") int id,
            @RequestBody BoardDTO dto,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        Long memberId = extractMemberIdFromToken(authorizationHeader);
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }
        dto.setBoard_id(id);
        dto.setMember_id(memberId.intValue());
        if (boardService.updateBoard(dto) > 0) {
            return ResponseEntity.ok("수정 성공");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다.");
        }
    } //updateBoard


    //** deleteboard 게시글 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable("id") int id,
                                         @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        Long memberId = extractMemberIdFromToken(authorizationHeader);
        if (memberId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");

        int result = boardService.deleteBoard(id);
        if (result > 0) return ResponseEntity.ok("삭제 성공");
        else return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한이 없거나 게시글이 없습니다.");
    }


}
