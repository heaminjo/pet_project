package com.example.pet_back.service;

import com.example.pet_back.domain.login.GoodsDTO;
import com.example.pet_back.entity.Cart;

import java.util.List;

public interface CartService {

//    List<Cart> findById(Long id);

    List<GoodsDTO> findAllByName(String name);
}
