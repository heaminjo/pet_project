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
import java.util.Map;


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
        BoardDTO dto = boardMapper.selectOne(category, board_id);
        if (dto != null){
            dto.setFileList(boardMapper.selectImageFileNamesByBoardId(board_id));
        }
        return dto;
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
        List<Map<String, String>> fileList = dto.getFileList();

        if (fileList != null && !fileList.isEmpty()) {
            for (int i = 0; i < fileList.size(); i++) {
                Map<String, String> file = fileList.get(i);
                boardMapper.insertBoardImage(
                        dto.getBoard_id(),
                        file.get("file_name"),
                        file.get("origin_name"),
                        file.get("file_type"),
                        i+1
                );
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

        List<Map<String, String>> fileList = dto.getFileList();
        if (fileList != null && !fileList.isEmpty()){
            for (int i = 0; i < fileList.size(); i++){
                Map<String, String> file = fileList.get(i);
                boardMapper.insertBoardImage(
                        board_id,
                        file.get("file_name"),
                        file.get("origin_name"),
                        file.get("file_type"),i+1
                );
            }
        }
        return result;
    }

    //** 게시글 삭제
    @Transactional
    @Override
    public int deleteBoard(int board_id) {
        // 1. 이미지 파일명 리스트 조회
        List<Map<String, String>> imageFileNames = boardMapper.selectImageFileNamesByBoardId(board_id);

        // 2. 이미지 테이블에서 삭제 및 파일 시스템에서 삭제
        if (imageFileNames != null && !imageFileNames.isEmpty()){
            for (Map<String, String> file : imageFileNames){
                String fileName = file.get("file_name");
                boardMapper.deleteBoardImage(board_id, fileName);
                imageService.deleteImageFile(fileName); //실제 파일 삭제
            }
        }

        // 3. 게시글 삭제
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
    public int insertBoardImage(int board_id, String fileName, String originName, String fileType, int outputOrder) {
        return boardMapper.insertBoardImage(board_id, fileName, originName, fileType, outputOrder);
    }

    //** 이미지 파일명 리스트 조회
    @Override
    public List<Map<String, String>> selectImageFileNamesByBoardId(int board_id) {
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
