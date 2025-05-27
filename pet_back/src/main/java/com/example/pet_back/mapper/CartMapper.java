package com.example.pet_back.mapper;

import com.example.pet_back.domain.login.CartRequestDTO;
import com.example.pet_back.domain.login.CartResponseDTO;
import com.example.pet_back.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CartMapper {
    //dto -> entity
    public Cart toEntity(CartRequestDTO dto);

    //entity -> dto
    public CartResponseDTO toDto(Cart cart);
}
