package com.example.pet_back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pet_back.domain.login.BoardDTO;
import com.example.pet_back.mapper.BoardMapper;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
	
	private final BoardMapper boardMapper;
	
	@Override
	public List<BoardDTO> selectList() {
		//return mapper.selectList();
		List<BoardDTO> list = boardMapper.selectList();
		return list;
	}

	@Override
	public BoardDTO selectOne(int id) {
		return boardMapper.selectOne(id);
	}

} //class
