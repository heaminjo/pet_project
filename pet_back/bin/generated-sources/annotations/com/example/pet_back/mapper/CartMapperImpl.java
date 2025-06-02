package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.CartRequestDTO;
import com.example.pet_back.domain.goods.CartResponseDTO;
import com.example.pet_back.entity.Cart;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T08:56:25+0900",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class CartMapperImpl implements CartMapper {

    @Override
    public Cart toEntity(CartRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Cart.CartBuilder cart = Cart.builder();

        cart.goods_id( dto.getGoods_id() );
        cart.member_id( dto.getMember_id() );

        return cart.build();
    }

    @Override
    public CartResponseDTO toDto(Cart cart) {
        if ( cart == null ) {
            return null;
        }

        CartResponseDTO.CartResponseDTOBuilder cartResponseDTO = CartResponseDTO.builder();

        cartResponseDTO.goods_id( cart.getGoods_id() );
        cartResponseDTO.member_id( cart.getMember_id() );
        cartResponseDTO.quantity( cart.getQuantity() );

        return cartResponseDTO.build();
    }
}
