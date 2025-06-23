package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.BoardDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;

import java.util.List;
import java.util.Map;

public interface BoardService {

    //** 게시글 목록
    //List<BoardDTO> selectList(String category);
    PageResponseDTO<BoardDTO> selectList(String category, PageRequestDTO pageRequestDTO, String searchType, String searchKeyword);

    //** 게시글 내용
    BoardDTO selectOne(String category, int board_id);

    //** 조회수 증가
    int increaseViews(String category, int board_id);

    //** 게시글 등록
    int insertBoard(BoardDTO dto);

    //** 게시글 수정
    int updateBoard(BoardDTO dto);

    //** 게시글 삭제
    int deleteBoard(int board_id);

    //** 내 게시글 목록
    PageResponseDTO<BoardDTO> selectMyBoardList(int member_id, PageRequestDTO pageRequestDTO, String type, String keyword, String sort);

    //** 이미지 삽입
    int insertBoardImage(int board_id, String fileName, String originName, String fileType, int outputOrder);

    //** 이미지 파일명 리스트 조회
    List<Map<String, String>> selectImageFileNamesByBoardId(int board_id);

    //** 이미지 삭제
    int deleteBoardImage(int board_id, String fileName);

    //** 이미지 전체 삭제
    int deleteAllBoardImages(int board_id);
}
