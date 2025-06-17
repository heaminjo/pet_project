package com.example.pet_back.service.board;

import com.example.pet_back.domain.board.BoardDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.mapper.board.BoardMapper;
import com.example.pet_back.service.ImageService;
import com.example.pet_back.service.ImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;
    private final ImageServiceImpl imageService;

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
    @Transactional
    @Override
    public int insertBoard(BoardDTO dto) {
        int result = boardMapper.insertBoard(dto);
        // 여러 장 이미지 저장
        List<String> fileNames = dto.getImageFileNames();

        if (fileNames != null && !fileNames.isEmpty()) {
            for (int i = 0; i < fileNames.size(); i++) {
                boardMapper.insertBoardImage(dto.getBoard_id(), fileNames.get(i), i + 1);
            }
        }
        return result;
    }

    //** 게시글 수정
    @Transactional
    @Override
    public int updateBoard(BoardDTO dto) {
        // 1. 게시글 내용 수정
        int result = boardMapper.updateBoard(dto);
        if (result <= 0) return result;

        int board_id = dto.getBoard_id();

        // 2. 삭제할 이미지 처리
        List<String> deletedImages = dto.getDeletedImageFileNames();
        if (deletedImages != null && !deletedImages.isEmpty()){
            for (String fileName : deletedImages){
                boardMapper.deleteBoardImage(board_id, fileName);
                //실제 파일 시스템에서도 삭제
                imageService.deleteImageFile(fileName);
            }
        }

        //3. 기존 이미지 전체 삭제 후, 남길 이미지만 다시 삽입
        boardMapper.deleteAllBoardImages(board_id);

        List<String> imageFileNames = dto.getImageFileNames();
        if (imageFileNames != null && !imageFileNames.isEmpty()){
            for (int i = 0; i < imageFileNames.size(); i++){
                boardMapper.insertBoardImage(board_id, imageFileNames.get(i), i+1);
            }
        }
        return result;
    }

    //** 게시글 삭제
    @Override
    public int deleteBoard(int board_id) {
        return boardMapper.deleteBoard(board_id);
    }

    @Override
    public PageResponseDTO<BoardDTO> selectMyBoardList(int member_id, PageRequestDTO pageRequestDTO, String type, String keyword, String sort) {
        int offset = pageRequestDTO.getPage() * pageRequestDTO.getSize();
        List<BoardDTO> content = boardMapper.selectMyBoardListPaging(member_id, pageRequestDTO.getSize(), offset, type, keyword, sort);
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

    //** 이미지 삽입
    @Override
    public int insertBoardImage(int board_id, String fileName, int outputOrder) {
        return boardMapper.insertBoardImage(board_id, fileName, outputOrder);
    }

    //** 이미지 파일명 리스트 조회
    @Override
    public List<String> selectImageFileNamesByBoardId(int board_id) {
        return boardMapper.selectImageFileNamesByBoardId(board_id);
    }

    //** 이미지 삭제
    public int deleteBoardImage(int board_id, String fileName){
        return boardMapper.deleteBoardImage(board_id, fileName);
    }

    //** 전체 이미지 삭제
    public int deleteAllBoardImages(int board_id){
        return boardMapper.deleteAllBoardImages(board_id);
    }

} //class
