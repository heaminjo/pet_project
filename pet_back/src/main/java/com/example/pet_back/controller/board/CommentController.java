package com.example.pet_back.controller.board;


import com.example.pet_back.domain.board.CommentDTO;
import com.example.pet_back.service.board.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board/{board_id}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    //** 댓글 목록 조회
    @GetMapping
    public List<CommentDTO> selectCommentsByBoardId(@PathVariable int board_id) {
        return commentService.selectCommentsByBoardId(board_id);
    }

    //** 댓글 등록
    @PostMapping
    public int insertComment(@PathVariable int board_id,
                             @RequestBody CommentDTO dto) {
        dto.setBoard_id(board_id);
        return commentService.insertComment(dto);
    }

    //** 댓글 삭제
    @DeleteMapping("/{comment_id}")
    public int deleteComment(@PathVariable int comment_id) {
        return commentService.deleteComment(comment_id);
    }

    @PutMapping("/{comment_id}")
    public int updateComment(@PathVariable int comment_id,
                             @RequestBody CommentDTO dto) {
        dto.setComment_id(comment_id);
        return commentService.updateComment(dto);
    }

}
