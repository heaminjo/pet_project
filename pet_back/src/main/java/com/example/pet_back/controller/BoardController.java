package com.example.pet_back.controller;

import java.util.List;

import com.example.pet_back.jwt.TokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.pet_back.domain.login.BoardDTO;
import com.example.pet_back.service.BoardService;

import lombok.RequiredArgsConstructor;

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
	@GetMapping("/boardList")
	public ResponseEntity<?> selectList() {
		//return service.selectList();
		List<BoardDTO> list = boardService.selectList();
		if(list!=null && list.size()>0){
			return ResponseEntity.ok().body(list);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("BoardList NotFound");
		}
	} //selectList()


	//** BoardDetail (게시글 내용)
	@GetMapping("/boardDetail/{id}")
	public ResponseEntity<?> selectOne(@PathVariable("id") int id) {

		BoardDTO dto = boardService.selectOne(id);

		if(dto!=null){
			return ResponseEntity.ok(dto);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다");
		}
	} //selectOne


	//** BoardInsert 게시글 등록
	@PostMapping("/boardinsert")
	public ResponseEntity<?> insertBoard(
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
										 @RequestHeader(value = "Authorization", required = false) String authorizationHeader){
		Long memberId = extractMemberIdFromToken(authorizationHeader);
		if(memberId==null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");

		int result = boardService.deleteBoard(id);
		if(result>0) return ResponseEntity.ok("삭제 성공");
		else return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한이 없거나 게시글이 없습니다.");
	}


}
