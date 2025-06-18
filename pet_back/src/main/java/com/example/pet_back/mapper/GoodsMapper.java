package com.example.pet_back.mapper;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.goods.CategoryResponseDTO;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.domain.goods.GoodsSimpleDTO;
import com.example.pet_back.entity.Category;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Goodsbanner;
import com.example.pet_back.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GoodsMapper {

    //dto -> entity
    public Goods toEntity(GoodsRequestDTO dto);

    //entity -> dto
    public GoodsResponseDTO toDto(Goods goods);

    // Entity 리스트 -> DTO 리스트
    List<GoodsResponseDTO> toDtoList(List<Goods> goodsList);

    // DTO 리스트 -> Entity 리스트
    List<Goods> toEntityList(List<GoodsResponseDTO> goodsList);

    //배너 DTO 변환
    @Mapping(source = "imageFile" ,target = "imageFile",qualifiedByName = "imageFileUrl")
    public BannerDTO bannerToDto(Goodsbanner goodsbanner);

    //카테고리 DTO 변환
    public CategoryResponseDTO categoryToDto(Category category);

    @Mapping(source = "category" ,target="categoryName",qualifiedByName = "toCategoryName")
    @Mapping(source = "imageFile" ,target = "imageFile",qualifiedByName = "imageFileUrl")
    @Mapping(source = "goodsState", target = "goodsState", qualifiedByName = "stateToString")
    public GoodsSimpleDTO goodsToDto(Goods goods);


    @Named("imageFileUrl")
    public static String imageFileUrl(String imageFile) {
        return "http://localhost:8080/resources/webapp/userImages/" + imageFile;
    }
    @Named("toCategoryName")
    public static String imageFileUrl(Category category) {
        return category.getCategoryName();
    }

    //state 한글로
    @Named("stateToString")
    public static String gradeToString(GOODSSTATE goodsState) {
        return goodsState.getGradeName();
    }
}
