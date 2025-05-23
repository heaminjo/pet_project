package com.example.pet_back.service;

import com.example.pet_back.domain.login.GoodsDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.repository.CartRepository;
import com.example.pet_back.repository.GoodsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{
    private final CartRepository crepository;

//    @Override
//    public List<Cart> findById(Long id){
//        return crepository.findById(id);
//    }

    @Override
    public List<GoodsDTO> findAllByName(String name) {
        return crepository.findAllByName(name);
    }
}
