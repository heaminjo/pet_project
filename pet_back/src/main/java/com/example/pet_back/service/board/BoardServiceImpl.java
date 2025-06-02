package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.BoardDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.mapper.board.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

    @Override
    public PageResponseDTO<BoardDTO> selectList(String category, PageRequestDTO pageRequestDTO) {
        //List<BoardDTO> list = boardMapper.selectList(category);
        //return list;
        int offset = pageRequestDTO.getPage() * pageRequestDTO.getSize();
        List<BoardDTO> content = boardMapper.selectListPaging(category, pageRequestDTO.getSize(), offset);
        long totalElements = boardMapper.countByCategory(category);
        int totalPages = (int) Math.ceil((double) totalElements / pageRequestDTO.getSize());
        boolean isPrev = pageRequestDTO.getPage() > 0;
        boolean isNext = pageRequestDTO.getPage() < totalPages - 1;
        return PageResponseDTO.<BoardDTO>builder()
                .content(content)
                .page(pageRequestDTO.getPage())
                .size(pageRequestDTO.getSize())
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isPrev(isPrev)
                .isNext(isNext)
                .build();
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
