package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.NoticeBoardDTO;

import java.util.List;

public interface NoticeBoardService {
    List<NoticeBoardDTO> selectList();

    NoticeBoardDTO selectOne(int board_id);

    int insertNoticeBoard(NoticeBoardDTO dto);

    int updateNoticeBoard(NoticeBoardDTO dto);

    int deleteNoticeBoard(int board_id);
}
