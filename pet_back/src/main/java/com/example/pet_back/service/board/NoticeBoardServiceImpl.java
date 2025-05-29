package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.NoticeBoardDTO;
import com.example.pet_back.mapper.board.NoticeBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeBoardServiceImpl implements NoticeBoardService {
    private final NoticeBoardMapper noticeBoardMapper;

    @Override
    public List<NoticeBoardDTO> selectList() {
        List<NoticeBoardDTO> list = noticeBoardMapper.selectList();
        return list;
    }

    @Override
    public NoticeBoardDTO selectOne(int id) {
        return noticeBoardMapper.selectOne(id);
    }

    @Override
    public int insertNoticeBoard(NoticeBoardDTO dto) {
        return noticeBoardMapper.insertNoticeBoard(dto);
    }

    @Override
    public int updateNoticeBoard(NoticeBoardDTO dto) {
        return noticeBoardMapper.updateNoticeBoard(dto);
    }

    @Override
    public int deleteNoticeBoard(int board_id) {
        return noticeBoardMapper.deleteNoticeBoard(board_id);
    }
}
