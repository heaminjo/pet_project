package com.example.pet_back.mapper;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.domain.goods.GoodsSimpleDTO;
import com.example.pet_back.domain.goods.ReviewResponseDTO;
import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    // 등록용: DTO -> Entity
    @Mapping(target = "reviewId", ignore = true)
    @Mapping(target = "member", source = "member")
    @Mapping(target = "orderDetail", source = "orderDetail")
    @Mapping(target = "goods", source = "goods")
    @Mapping(target = "imageFile", source = "dto.uploadImg") // 파일명은 컨트롤러나 서비스에서 별도 처리

    @Mapping(target = "regDate", ignore = true) // @PrePersist에서 자동 처리
    @Mapping(target = "modDate", ignore = true)
    Review toEntity(ReviewUploadDTO dto, Member member, Goods goods, OrderDetail orderDetail);

    // 커스텀 매핑 메서드 추가
    default String map(MultipartFile file) {
        return file != null ? file.getOriginalFilename() : null;
    }

    // 조회용: Entity -> DTO
    @Mapping(target = "memberId", source = "member.id")
    @Mapping(target = "orderDetailId", source = "orderDetail.orderDetailId")
    @Mapping(target = "goodsId", source = "goods.goodsId")
    @Mapping(target = "goods", source = "goods") // GoodsSimpleDTO 매핑 위함
    @Mapping(target = "memberResponseDTO", source = "member")
    @Mapping(target = "regDate", source = "regDate")
    ReviewResponseDTO toDTO(Review review);

    // Goods → GoodsSimpleDTO
    default GoodsSimpleDTO map(Goods goods) {
        if (goods == null) return null;
        return new GoodsSimpleDTO(
                goods.getGoodsId(),
                goods.getGoodsName(),
                goods.getImageFile(),
                goods.getCategory() != null ? goods.getCategory().getCategoryName() : null,
                goods.getGoodsState().name(),
                goods.getQuantity(),
                goods.getRating(),
                goods.getReviewNum(),
                goods.getPrice()
        );
    }

    // Member → MemberResponseDTO
    default MemberResponseDTO map(Member member) {
        if (member == null) return null;

        return MemberResponseDTO.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phone(member.getPhone())
                // 필요 시 추가 필드
                .build();
    }




}
