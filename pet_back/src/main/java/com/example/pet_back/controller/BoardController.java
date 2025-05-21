package com.example.pet_back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pet_back.domain.login.BoardDTO;
import com.example.pet_back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service;
	
	//** BoardList
	@GetMapping("/boardList")
	public ResponseEntity<?> boardList(Model model) {
		//return service.selectList();
		List<BoardDTO> list = service.selectList();
		return ResponseEntity.ok(list);
	} //boardList()
	
	//=> insertForm 출력
	@GetMapping("/boardInsert")
	public void boardInsert() {}

}
