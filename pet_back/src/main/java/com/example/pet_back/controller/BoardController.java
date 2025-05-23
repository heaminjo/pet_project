package com.example.pet_back.controller;

import java.util.List;

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
	
	private final BoardService boardService;
	
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
	}

	//** BoardInsert 게시글 등록
	@PostMapping("/insert")
	public ResponseEntity<?> insertBoard(@RequestBody BoardDTO dto) {
		int result = boardService.insertBoard(dto);
		if (result > 0) {
			return ResponseEntity.ok("등록 성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록 실패");
		}
	}


}
