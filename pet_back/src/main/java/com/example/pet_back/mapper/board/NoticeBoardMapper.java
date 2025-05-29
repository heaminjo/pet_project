package com.example.pet_back.mapper.board;

import com.example.pet_back.domain.board.NoticeBoardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeBoardMapper {
    List<NoticeBoardDTO> selectList();

    NoticeBoardDTO selectOne(int board_id);

    int insertNoticeBoard(NoticeBoardDTO dto);

    int updateNoticeBoard(NoticeBoardDTO dto);

    int deleteNoticeBoard(int board_id);
}
