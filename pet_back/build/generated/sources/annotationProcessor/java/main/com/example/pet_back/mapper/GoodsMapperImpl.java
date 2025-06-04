package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.entity.Goods;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-03T16:04:53+0900",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.13.jar, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class GoodsMapperImpl implements GoodsMapper {

    @Override
    public Goods toEntity(GoodsRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Goods.GoodsBuilder goods = Goods.builder();

        goods.goods_id( dto.getGoods_id() );
        goods.category_id( dto.getCategory_id() );
        goods.goods_name( dto.getGoods_name() );
        goods.price( dto.getPrice() );
        goods.description( dto.getDescription() );
        goods.goods_state( dto.getGoods_state() );
        goods.image_file( dto.getImage_file() );
        goods.quantity( dto.getQuantity() );
        goods.reg_date( dto.getReg_date() );
        goods.upload_img( dto.getUpload_img() );

        return goods.build();
    }

    @Override
    public GoodsResponseDTO toDto(Goods goods) {
        if ( goods == null ) {
            return null;
        }

        GoodsResponseDTO.GoodsResponseDTOBuilder goodsResponseDTO = GoodsResponseDTO.builder();

        goodsResponseDTO.goods_id( goods.getGoods_id() );
        goodsResponseDTO.category_id( goods.getCategory_id() );
        goodsResponseDTO.goods_name( goods.getGoods_name() );
        goodsResponseDTO.price( goods.getPrice() );
        goodsResponseDTO.description( goods.getDescription() );
        goodsResponseDTO.goods_state( goods.getGoods_state() );
        goodsResponseDTO.image_file( goods.getImage_file() );
        goodsResponseDTO.rating( goods.getRating() );
        goodsResponseDTO.views( goods.getViews() );
        goodsResponseDTO.review_num( goods.getReview_num() );
        goodsResponseDTO.quantity( goods.getQuantity() );
        goodsResponseDTO.reg_date( goods.getReg_date() );

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

    protected Goods goodsResponseDTOToGoods(GoodsResponseDTO goodsResponseDTO) {
        if ( goodsResponseDTO == null ) {
            return null;
        }

        Goods.GoodsBuilder goods = Goods.builder();

        goods.goods_id( goodsResponseDTO.getGoods_id() );
        goods.category_id( goodsResponseDTO.getCategory_id() );
        goods.goods_name( goodsResponseDTO.getGoods_name() );
        goods.price( goodsResponseDTO.getPrice() );
        goods.description( goodsResponseDTO.getDescription() );
        goods.goods_state( goodsResponseDTO.getGoods_state() );
        goods.image_file( goodsResponseDTO.getImage_file() );
        goods.rating( goodsResponseDTO.getRating() );
        goods.views( goodsResponseDTO.getViews() );
        goods.review_num( goodsResponseDTO.getReview_num() );
        goods.quantity( goodsResponseDTO.getQuantity() );
        goods.reg_date( goodsResponseDTO.getReg_date() );

        return goods.build();
    }
}
