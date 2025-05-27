package com.example.pet_back.service;

import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.CartRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService {

    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;

    private final MemberMapper mapper;


}
