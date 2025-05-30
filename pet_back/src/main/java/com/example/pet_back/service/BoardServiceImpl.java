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
	//test
	@Override
	public BoardDTO selectOne(int id) {
		return boardMapper.selectOne(id);
	}

	@Override
	public int insertBoard(BoardDTO dto) {
		return boardMapper.insertBoard(dto);
	}

	@Override
	public int updateBoard(BoardDTO dto){
		return boardMapper.updateBoard(dto);
	}

	@Override
	public int deleteBoard(int board_id){ return boardMapper.deleteBoard(board_id); }

} //class
