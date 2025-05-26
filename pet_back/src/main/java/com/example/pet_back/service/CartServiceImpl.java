package com.example.pet_back.service;

import com.example.pet_back.domain.login.CartResponseDTO;
import com.example.pet_back.domain.login.GoodsDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.repository.CartRepository;
import com.example.pet_back.repository.GoodsRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;

    @Override
    public ResponseEntity<?> selectList(CustomUserDetails userDetails){
        log.info("** CartServiceImpl 실행됨 **");
        //유저 details에서 id 가져와 회원을 가져온다.
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
       List<CartResponseDTO> cartList = (cartRepository.findCartListByUserId(member.getId())) //
               .stream().map(cart -> new CartResponseDTO()).collect(Collectors.toList());
       if(cartList!=null){
           log.info("장바구니 리스트 조회 정상 : "+cartList);
           return ResponseEntity.status(HttpStatus.OK).body(cartList);
       }else{
           return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("null");
       }
    }


}
