package com.example.pet_back.mapper.board;

import com.example.pet_back.domain.board.BoardDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    //** selectList
    List<BoardDTO> selectList(@Param("category") String category);

    //** selectOne
    BoardDTO selectOne(@Param("category") String category, @Param("board_id") int board_id);

    //** insert
    int insertBoard(BoardDTO dto);

    //** update
    int updateBoard(BoardDTO dto);

    //** delete
    int deleteBoard(int board_id);
}
