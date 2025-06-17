package com.example.pet_back.mapper.board;

import com.example.pet_back.domain.board.BoardDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    //** 게시글 목록
    //List<BoardDTO> selectList(@Param("category") String category);
    List<BoardDTO> selectListPaging(@Param("category") String category,
                                    @Param("size") int size,
                                    @Param("offset") int offset,
                                    @Param("searchType") String searchType,
                                    @Param("searchKeyword") String searchKeyword);

    long countByCategory(@Param("category") String category,
                         @Param("searchType") String searchType,
                         @Param("searchKeyword") String searchKeyword);

    //** 게시글 내용
    BoardDTO selectOne(@Param("category") String category, @Param("board_id") int board_id);

    //** 조회수 증가
    int increaseViews(@Param("category") String category, @Param("board_id") int board_id);

    //** 게시글 등록
    int insertBoard(BoardDTO dto);

    //** 게시글 수정
    int updateBoard(BoardDTO dto);

    //** 게시글 삭제
    int deleteBoard(int board_id);

    //** 내 게시글 목록 페이징+검색
    List<BoardDTO> selectMyBoardListPaging(
            @Param("member_id") int member_id,
            @Param("size") int size,
            @Param("offset") int offset,
            @Param("type") String type,
            @Param("keyword") String keyword,
            @Param("sort") String sort
    );

    //** 내 게시글 전체 개수(검색 포함)
    long countByMemberId(
            @Param("member_id") int member_id,
            @Param("type") String type,
            @Param("keyword") String keyword
    );

    //** 이미지 삽입 메서드
    int insertBoardImage(@Param("board_id") int board_id,
                         @Param("fileName") String fileName,
                         @Param("outputOrder") int outputOrder);

    //** 이미지 파일명 리스트 조회
    List<String> selectImageFileNamesByBoardId(@Param("board_id") int board_id);

    //** 이미지 삭제
    int deleteBoardImage(@Param("board_id") int board_id,
                         @Param("fileName") String fileName);

    //** 전체 이미지 삭제
    int deleteAllBoardImages(@Param("board_id") int board_id);

}
