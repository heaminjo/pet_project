package com.example.pet_back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.pet_back.domain.login.BoardDTO;

@Mapper
public interface BoardMapper {
	
	//** selectList
		List<BoardDTO> selectList();

	//** selectOne
	BoardDTO selectOne(int id);

	//** insert
	int insertBoard(BoardDTO dto);

	//** update
	int updateBoard(BoardDTO dto);
}
