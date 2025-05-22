package com.example.pet_back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pet_back.domain.login.BoardDTO;
import com.example.pet_back.service.BoardService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
	
	private final BoardService boardService;
	
	//** BoardList
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
	
	//=> insertForm 출력
	@GetMapping("/boardInsert")
	public void boardInsert() {}

}
