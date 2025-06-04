package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.CartRequestDTO;
import com.example.pet_back.domain.goods.CartResponseDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-03T16:04:53+0900",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.13.jar, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class CartMapperImpl implements CartMapper {

    @Override
    public Cart toEntity(CartRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Cart.CartBuilder cart = Cart.builder();

        cart.member_id( dto.getMember_id() );
        cart.goods_id( dto.getGoods_id() );

        return cart.build();
    }

    @Override
    public CartResponseDTO toDto(Cart cart) {
        if ( cart == null ) {
            return null;
        }

        CartResponseDTO.CartResponseDTOBuilder cartResponseDTO = CartResponseDTO.builder();

        cartResponseDTO.goods( goodsToGoodsResponseDTO( cart.getGoods() ) );
        cartResponseDTO.member_id( cart.getMember_id() );
        cartResponseDTO.goods_id( cart.getGoods_id() );
        cartResponseDTO.quantity( cart.getQuantity() );

        return cartResponseDTO.build();
    }

    protected GoodsResponseDTO goodsToGoodsResponseDTO(Goods goods) {
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
}
