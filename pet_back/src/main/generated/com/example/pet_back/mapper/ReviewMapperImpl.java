package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.ReviewRequestDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-18T14:54:17+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review toEntity(ReviewRequestDTO dto, Member member, Goods goods, OrderDetail orderDetail) {
        if ( dto == null && member == null && goods == null && orderDetail == null ) {
            return null;
        }

        Review.ReviewBuilder review = Review.builder();

        if ( dto != null ) {
            review.imageFile( map( dto.getImageFile() ) );
            review.score( dto.getScore() );
            review.title( dto.getTitle() );
            review.content( dto.getContent() );
        }
        review.member( member );
        review.goods( goods );
        review.orderDetail( orderDetail );

        return review.build();
    }
}
