package com.example.pet_back.mapper.board;

import com.example.pet_back.domain.board.BoardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

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

    //** delete
    int deleteBoard(int board_id);
}
