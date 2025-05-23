package com.example.pet_back.repository;

import com.example.pet_back.domain.login.GoodsDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Long> {



}
