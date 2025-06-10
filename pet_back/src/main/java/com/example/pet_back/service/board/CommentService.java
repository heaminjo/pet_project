package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.CommentDTO;

import java.util.List;

public interface CommentService {

    //** 댓글 목록 조회
    List<CommentDTO> selectCommentsByBoardId(int board_id);

    //** 댓글 등록
    int insertComment(CommentDTO dto);

    //** 댓글 삭제
    int deleteComment(int comment_id);

    //** 댓글 수정
    int updateComment(CommentDTO dto);
}
