package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.BoardDTO;

import java.util.List;

public interface BoardService {

    //** 게시글 목록
    List<BoardDTO> selectList(String category);

    //** 게시글 내용
    BoardDTO selectOne(String category, int board_id);

    //** 게시글 등록
    int insertBoard(BoardDTO dto);

    //** 게시글 수정
    int updateBoard(BoardDTO dto);

    //** 게시글 삭제
    int deleteBoard(int board_id);
}
