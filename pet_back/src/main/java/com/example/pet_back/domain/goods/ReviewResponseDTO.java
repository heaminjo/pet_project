package com.example.pet_back.domain.goods;

import com.example.pet_back.domain.member.MemberResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponseDTO {

    private Long reviewId;
    private Long memberId;
    private Long orderDetailId;
    private Long goodsId;

    private int score;
    private String title;
    private String content;
    private String imageFile;
    private LocalDate regDate;
    private LocalDate modDate;

    private GoodsSimpleDTO goods;
    private MemberResponseDTO memberResponseDTO;

}
