package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.CommentDTO;
import com.example.pet_back.mapper.board.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;

    //** 댓글 목록 조회
    @Override
    public List<CommentDTO> selectCommentsByBoardId(int board_id) {
        return commentMapper.selectCommentsByBoardId(board_id);
    }

    //** 댓글 등록
    @Override
    public int insertComment(CommentDTO dto) {
        return commentMapper.insertComment(dto);
    }

    //** 댓글 삭제
    @Override
    public int deleteComment(int comment_id) {
        return commentMapper.deleteComment(comment_id);
    }

    //** 댓글 수정
    @Override
    public int updateComment(CommentDTO dto) {
        return commentMapper.updateComment(dto);
    }

}
