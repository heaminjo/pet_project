package com.example.pet_back.mapper;

import com.example.pet_back.domain.login.CartRequestDTO;
import com.example.pet_back.domain.login.CartResponseDTO;
import com.example.pet_back.domain.login.CartResponseDTO.CartResponseDTOBuilder;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Cart.CartBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-27T17:43:39+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class CartMapperImpl implements CartMapper {

    @Override
    public Cart toEntity(CartRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        CartBuilder cart = Cart.builder();

        cart.member_id( dto.getMember_id() );

        return cart.build();
    }

    @Override
    public CartResponseDTO toDto(Cart cart) {
        if ( cart == null ) {
            return null;
        }

        CartResponseDTOBuilder cartResponseDTO = CartResponseDTO.builder();

        cartResponseDTO.member_id( cart.getMember_id() );
        cartResponseDTO.goods_id( cart.getGoods_id() );
        cartResponseDTO.quantity( cart.getQuantity() );

        return cartResponseDTO.build();
    }
}
