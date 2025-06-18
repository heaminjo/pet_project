package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.ReviewRequestDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.web.multipart.MultipartFile;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    // DTO -> Entity
    @Mapping(source = "member", target = "member") // Member 엔티티
    @Mapping(source = "goods", target = "goods")   // Goods 엔티티
    @Mapping(source = "orderDetail", target = "orderDetail") // OrderDetail 엔티티
    @Mapping(source = "dto.imageFile", target = "imageFile")
    Review toEntity(ReviewRequestDTO dto, Member member, Goods goods, OrderDetail orderDetail);


    // 커스텀 매핑 메서드 추가
    default String map(MultipartFile file) {
        return file != null ? file.getOriginalFilename() : null;
    }


    // 필요시 Entity -> DTO 도 작성 가능


}
