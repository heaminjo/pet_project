package com.example.pet_back.mapper;

import com.example.pet_back.domain.login.CartRequestDTO;
import com.example.pet_back.domain.login.CartResponseDTO;
import com.example.pet_back.entity.Cart;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-29T09:49:03+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
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

        return cart.build();
    }

    @Override
    public CartResponseDTO toDto(Cart cart) {
        if ( cart == null ) {
            return null;
        }

        CartResponseDTO.CartResponseDTOBuilder cartResponseDTO = CartResponseDTO.builder();

        cartResponseDTO.member_id( cart.getMember_id() );
        cartResponseDTO.goods_id( cart.getGoods_id() );
        cartResponseDTO.quantity( cart.getQuantity() );

        return cartResponseDTO.build();
    }
}
