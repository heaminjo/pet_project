package com.example.pet_back.service;

import java.util.List;

import com.example.pet_back.domain.login.BoardDTO;

public interface BoardService {
	
	//** selectList
	List<BoardDTO> selectList();

	//** selectOne
	BoardDTO selectOne(int id);
}
