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
    @Override
    public ResponseEntity<?> findAllByUserId(CustomUserDetails userDetails) {
        //유저 details에서 id 가져와 회원을 가져온다.
        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(()-> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        List<GoodsDTO> list = cartRepository.findAllById(member.getId());
        //return ResponseEntity.ok(mapper.toDto(member));
        return ResponseEntity.ok(list);
    }



}
