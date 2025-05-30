package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.BoardDTO;
import com.example.pet_back.mapper.board.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

    @Override
    public List<BoardDTO> selectList(String category) {
        //return mapper.selectList();
        List<BoardDTO> list = boardMapper.selectList(category);
        return list;
    }

    //test
    @Override
    public BoardDTO selectOne(String category, int board_id) {
        return boardMapper.selectOne(category, board_id);
    }

    @Override
    public int insertBoard(BoardDTO dto) {
        return boardMapper.insertBoard(dto);
    }

    @Override
    public int updateBoard(BoardDTO dto) {
        return boardMapper.updateBoard(dto);
    }

    @Override
    public int deleteBoard(int board_id) {
        return boardMapper.deleteBoard(board_id);
    }

} //class
