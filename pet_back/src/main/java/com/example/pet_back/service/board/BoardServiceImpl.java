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

    //** 게시글 목록
    @Override
    public PageResponseDTO<BoardDTO> selectList(String category, PageRequestDTO pageRequestDTO, String searchType, String searchKeyword) {
        //List<BoardDTO> list = boardMapper.selectList(category);
        //return list;
        int offset = pageRequestDTO.getPage() * pageRequestDTO.getSize();
        List<BoardDTO> content = boardMapper.selectListPaging(category, pageRequestDTO.getSize(), offset, searchType, searchKeyword);
        long totalElements = boardMapper.countByCategory(category, searchType, searchKeyword);
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

    //** 게시글 내용
    @Override
    public BoardDTO selectOne(String category, int board_id) {
        return boardMapper.selectOne(category, board_id);
    }

    //** 조회수 증가
    @Override
    public int increaseViews(String category, int board_id) {
        return boardMapper.increaseViews(category, board_id);
    }


    //** 게시글 등록
    @Override
    public int insertBoard(BoardDTO dto) {
        return boardMapper.insertBoard(dto);
    }

    //** 게시글 수정
    @Override
    public int updateBoard(BoardDTO dto) {
        return boardMapper.updateBoard(dto);
    }

    //** 게시글 삭제
    @Override
    public int deleteBoard(int board_id) {
        return boardMapper.deleteBoard(board_id);
    }

    @Override
    public PageResponseDTO<BoardDTO> selectMyBoardList(int member_id, PageRequestDTO pageRequestDTO, String type, String keyword) {
        int offset = pageRequestDTO.getPage() * pageRequestDTO.getSize();
        List<BoardDTO> content = boardMapper.selectMyBoardListPaging(member_id, pageRequestDTO.getSize(), offset, type, keyword);
        long totalElements = boardMapper.countByMemberId(member_id, type, keyword);
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

} //class
