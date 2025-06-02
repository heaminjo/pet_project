package com.example.pet_back.mapper.board;

import com.example.pet_back.domain.board.BoardDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    //** 게시글 목록
    List<BoardDTO> selectList(@Param("category") String category);

    //** 게시글 내용
    BoardDTO selectOne(@Param("category") String category, @Param("board_id") int board_id);

    //** 게시글 등록
    int insertBoard(BoardDTO dto);

    //** 게시글 수정
    int updateBoard(BoardDTO dto);

    //** 게시글 삭제
    int deleteBoard(int board_id);
}
