package com.example.pet_back.mapper;

import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.goods.CategoryResponseDTO;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.domain.goods.GoodsSimpleDTO;
import com.example.pet_back.entity.Category;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Goodsbanner;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-17T17:10:26+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class GoodsMapperImpl implements GoodsMapper {

    @Override
    public Goods toEntity(GoodsRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Goods.GoodsBuilder goods = Goods.builder();

        goods.goodsId( dto.getGoodsId() );
        goods.goodsName( dto.getGoodsName() );
        goods.price( dto.getPrice() );
        goods.description( dto.getDescription() );
        goods.goodsState( dto.getGoodsState() );
        goods.imageFile( dto.getImageFile() );
        goods.quantity( dto.getQuantity() );
        goods.regDate( dto.getRegDate() );

        return goods.build();
    }

    @Override
    public GoodsResponseDTO toDto(Goods goods) {
        if ( goods == null ) {
            return null;
        }

        GoodsResponseDTO.GoodsResponseDTOBuilder<?, ?> goodsResponseDTO = GoodsResponseDTO.builder();

        goodsResponseDTO.goodsId( goods.getGoodsId() );
        goodsResponseDTO.goodsName( goods.getGoodsName() );
        goodsResponseDTO.price( goods.getPrice() );
        goodsResponseDTO.description( goods.getDescription() );
        goodsResponseDTO.goodsState( goods.getGoodsState() );
        goodsResponseDTO.imageFile( goods.getImageFile() );
        goodsResponseDTO.rating( goods.getRating() );
        goodsResponseDTO.views( goods.getViews() );
        goodsResponseDTO.reviewNum( goods.getReviewNum() );
        goodsResponseDTO.quantity( goods.getQuantity() );
        goodsResponseDTO.regDate( goods.getRegDate() );

        return goodsResponseDTO.build();
    }

    @Override
    public List<GoodsResponseDTO> toDtoList(List<Goods> goodsList) {
        if ( goodsList == null ) {
            return null;
        }

        List<GoodsResponseDTO> list = new ArrayList<GoodsResponseDTO>( goodsList.size() );
        for ( Goods goods : goodsList ) {
            list.add( toDto( goods ) );
        }

        return list;
    }

    @Override
    public List<Goods> toEntityList(List<GoodsResponseDTO> goodsList) {
        if ( goodsList == null ) {
            return null;
        }

        List<Goods> list = new ArrayList<Goods>( goodsList.size() );
        for ( GoodsResponseDTO goodsResponseDTO : goodsList ) {
            list.add( goodsResponseDTOToGoods( goodsResponseDTO ) );
        }

        return list;
    }

    @Override
    public BannerDTO bannerToDto(Goodsbanner goodsbanner) {
        if ( goodsbanner == null ) {
            return null;
        }

        BannerDTO bannerDTO = new BannerDTO();

        bannerDTO.setImageFile( GoodsMapper.imageFileUrl( goodsbanner.getImageFile() ) );
        bannerDTO.setBannerId( goodsbanner.getBannerId() );
        bannerDTO.setPosition( goodsbanner.getPosition() );

        return bannerDTO;
    }

    @Override
    public CategoryResponseDTO categoryToDto(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();

        categoryResponseDTO.setCategoryId( category.getCategoryId() );
        categoryResponseDTO.setCategoryName( category.getCategoryName() );
        categoryResponseDTO.setDescription( category.getDescription() );

        return categoryResponseDTO;
    }

    @Override
    public GoodsSimpleDTO goodsToDto(Goods goods) {
        if ( goods == null ) {
            return null;
        }

        GoodsSimpleDTO goodsSimpleDTO = new GoodsSimpleDTO();

        goodsSimpleDTO.setCategoryName( GoodsMapper.imageFileUrl( goods.getCategory() ) );
        goodsSimpleDTO.setImageFile( GoodsMapper.imageFileUrl( goods.getImageFile() ) );
        goodsSimpleDTO.setGoodsId( goods.getGoodsId() );
        goodsSimpleDTO.setGoodsName( goods.getGoodsName() );
        goodsSimpleDTO.setPrice( goods.getPrice() );

        return goodsSimpleDTO;
    }

    protected Goods goodsResponseDTOToGoods(GoodsResponseDTO goodsResponseDTO) {
        if ( goodsResponseDTO == null ) {
            return null;
        }

        Goods.GoodsBuilder goods = Goods.builder();

        goods.goodsId( goodsResponseDTO.getGoodsId() );
        goods.goodsName( goodsResponseDTO.getGoodsName() );
        goods.price( goodsResponseDTO.getPrice() );
        goods.description( goodsResponseDTO.getDescription() );
        goods.goodsState( goodsResponseDTO.getGoodsState() );
        goods.imageFile( goodsResponseDTO.getImageFile() );
        goods.rating( goodsResponseDTO.getRating() );
        goods.views( goodsResponseDTO.getViews() );
        goods.reviewNum( goodsResponseDTO.getReviewNum() );
        goods.quantity( goodsResponseDTO.getQuantity() );
        goods.regDate( goodsResponseDTO.getRegDate() );

        return goods.build();
    }
}
