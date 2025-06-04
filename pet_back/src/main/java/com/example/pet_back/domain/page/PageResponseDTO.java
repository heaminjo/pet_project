package com.example.pet_back.domain.page;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageResponseDTO<T> {
    private List<?> content;
    private int page; //현재 페이지
    private int size; //한 페이지 크기
    private long totalElements; //전체 데이터 개수
    private int totalPages; //전체 페이지 개수
    private boolean isNext; //다음 페이지가 있나
    private boolean isPrev; //이전 페이지가 있나

}
