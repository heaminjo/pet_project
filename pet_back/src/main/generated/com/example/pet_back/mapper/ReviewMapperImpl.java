package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.ReviewResponseDTO;
import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T09:32:28+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review toEntity(ReviewUploadDTO dto, Member member, Goods goods, OrderDetail orderDetail) {
        if ( dto == null && member == null && goods == null && orderDetail == null ) {
            return null;
        }

        Review.ReviewBuilder review = Review.builder();

        if ( dto != null ) {
            review.imageFile( dto.getUploadImg() );
            review.score( dto.getScore() );
            review.title( dto.getTitle() );
            review.content( dto.getContent() );
        }
        review.member( member );
        review.goods( goods );
        review.orderDetail( orderDetail );

        return review.build();
    }

    @Override
    public ReviewResponseDTO toDTO(Review review) {
        if ( review == null ) {
            return null;
        }

        ReviewResponseDTO.ReviewResponseDTOBuilder reviewResponseDTO = ReviewResponseDTO.builder();

        reviewResponseDTO.memberId( reviewMemberId( review ) );
        reviewResponseDTO.orderDetailId( reviewOrderDetailOrderDetailId( review ) );
        reviewResponseDTO.goodsId( reviewGoodsGoodsId( review ) );
        reviewResponseDTO.reviewId( review.getReviewId() );
        reviewResponseDTO.score( review.getScore() );
        reviewResponseDTO.title( review.getTitle() );
        reviewResponseDTO.content( review.getContent() );
        reviewResponseDTO.imageFile( review.getImageFile() );
        reviewResponseDTO.regDate( review.getRegDate() );
        reviewResponseDTO.modDate( review.getModDate() );

        return reviewResponseDTO.build();
    }

    private Long reviewMemberId(Review review) {
        if ( review == null ) {
            return null;
        }
        Member member = review.getMember();
        if ( member == null ) {
            return null;
        }
        Long id = member.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long reviewOrderDetailOrderDetailId(Review review) {
        if ( review == null ) {
            return null;
        }
        OrderDetail orderDetail = review.getOrderDetail();
        if ( orderDetail == null ) {
            return null;
        }
        Long orderDetailId = orderDetail.getOrderDetailId();
        if ( orderDetailId == null ) {
            return null;
        }
        return orderDetailId;
    }

    private Long reviewGoodsGoodsId(Review review) {
        if ( review == null ) {
            return null;
        }
        Goods goods = review.getGoods();
        if ( goods == null ) {
            return null;
        }
        Long goodsId = goods.getGoodsId();
        if ( goodsId == null ) {
            return null;
        }
        return goodsId;
    }
}
