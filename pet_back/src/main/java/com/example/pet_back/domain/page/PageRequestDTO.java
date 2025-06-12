package com.example.pet_back.domain.page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageRequestDTO {
    private int page; //요청 페이지
    private int size; //조회되는 총 사이즈
    private String sortBy; //정렬 기준
    private String keyword; //키워드
    private String type;    //검색 타입
    private Long category; //카테고리
}
