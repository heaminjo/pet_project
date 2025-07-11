package com.example.pet_back.controller.board;

import com.example.pet_back.domain.board.BoardDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.service.ImageServiceImpl;
import com.example.pet_back.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
    //d
    private final BoardService boardService;
    private final TokenProvider tokenProvider;
    private final ImageServiceImpl imageService;


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
                                        @RequestParam(value = "size", defaultValue = "3") int size,
                                        @RequestParam(value = "searchType", required = false) String searchType,
                                        @RequestParam(value = "searchKeyword", required = false) String searchKeyword) {
        //List<BoardDTO> list = boardService.selectList(category);
        //return ResponseEntity.ok(list != null ? list : new ArrayList<>());
        PageRequestDTO pageRequestDTO = new PageRequestDTO(page, size, null,null, searchKeyword, searchType,null);
        PageResponseDTO<BoardDTO> responseDTO = boardService.selectList(category, pageRequestDTO, searchType, searchKeyword);
        return ResponseEntity.ok(responseDTO);
    } //selectList()


    //** BoardDetail (게시글 내용)
    @GetMapping("/boardDetail/{category}/{board_id}")
    public ResponseEntity<?> selectOne(@PathVariable("board_id") int board_id,
                                       @PathVariable("category") String category) {

        boardService.increaseViews(category, board_id);

        BoardDTO dto = boardService.selectOne(category, board_id);

        if (dto != null) {
            List<Map<String,String>> imageFileNames = boardService.selectImageFileNamesByBoardId(board_id);
            dto.setFileList(imageFileNames);
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
    @PutMapping("/updateboard/{board_id}")
    public ResponseEntity<?> updateBoard(
            @PathVariable("board_id") int board_id,
            @RequestBody BoardDTO dto,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        Long memberId = extractMemberIdFromToken(authorizationHeader);
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }
        dto.setBoard_id(board_id);
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

    // [추가] 내 게시글 목록 조회
    @GetMapping("/myboardList")
    public ResponseEntity<?> myBoardList(
            @RequestParam("member_id") int member_id,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "sort", required = false) String sort
    ) {
        PageRequestDTO pageRequestDTO = new PageRequestDTO(page, size, sort, keyword, type,null,null);
        PageResponseDTO<BoardDTO> responseDTO = boardService.selectMyBoardList(member_id, pageRequestDTO, type, keyword, sort);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/uploadfile")
    public ResponseEntity<List<Map<String, String>>> uploadFile(@RequestParam("files") List<MultipartFile> files) {

        //1. 저장 경로 지정
        String uploadDir = imageService.getRealPath();

        //2. 파일명 중복 방지 (UUID 등으로 랜덤 이름)
        List<Map<String, String>> savedFiles = new ArrayList<>();

        for (MultipartFile file : files) {
            String originalFileName = file.getOriginalFilename();
            String extension = "";

            if (originalFileName != null && originalFileName.contains(".")) {
                extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }

            String savedFileName = UUID.randomUUID() + extension;
            String fileType = file.getContentType();

            File dest = new File(uploadDir + savedFileName);

            //3. 폴더 없으면 생성
            dest.getParentFile().mkdirs();

            try {
                //4. 파일 저장
                file.transferTo(dest);
                Map<String, String> fileInfo = new HashMap<>();
                fileInfo.put("file_name", savedFileName);
                fileInfo.put("origin_name", originalFileName);
                fileInfo.put("file_type", fileType);

                savedFiles.add(fileInfo);

            } catch (IOException e) {
                return ResponseEntity.internalServerError().body(null);
            }
        }
        return ResponseEntity.ok(savedFiles);
    }

}
