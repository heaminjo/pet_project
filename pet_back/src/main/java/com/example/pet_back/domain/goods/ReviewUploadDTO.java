package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUploadDTO {
    private Long memberId;         // 로그인 사용자 정보
    private Long goodsId;          // 상품 ID
    private Long orderDetailId;    // 주문 상세 ID

    private int score;             // 별점 (1~5)
    private String title;          // 한줄 요약
    private String content;        // 상세 리뷰
    private List<MultipartFile> imageFiles;
    private String uploadImg; // 복수 저장을 위해 추가, 이미지 파일명

    // 수정시
    private Long reviewId;

    private LocalDate regDate;
    private LocalDate modDate;
}
