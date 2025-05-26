package com.example.pet_back.service;

import com.example.pet_back.domain.login.CartDTO;
import com.example.pet_back.domain.login.GoodsDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.CartRepository;
import com.example.pet_back.repository.GoodsRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService{

    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;

    private final MemberMapper mapper;


}
