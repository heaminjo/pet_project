package com.example.pet_back.service;

import com.example.pet_back.domain.goods.CartResponseDTO;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.CartId;
import com.example.pet_back.entity.Goods;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final GoodsRepository goodsRepository;
    private final MemberRepository memberRepository;

    // 장바구니 리스트 출력
    @Override
    public ResponseEntity<?> selectList(CustomUserDetails userDetails) {
        log.info("** CartServiceImpl 실행됨 **");
        //유저 details에서 id 가져와 회원을 가져온다.
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));

        List<CartResponseDTO> cartList = cartRepository.findCartListByUserId(member.getId());
        log.info("확인");
        log.info(cartList.toString());
        return ResponseEntity.status(HttpStatus.OK).body(cartList);

    }

    // 상품을 장바구니에 추가
    @Override
    public ResponseEntity<?> addToCart(CustomUserDetails userDetails, //
                                       GoodsRequestDTO goodsRequestDTO) {
        log.info("** CartServiceImpl 실행됨 **");
        // member 불러옴
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        // goods 불러옴
        Goods goods = goodsRepository.findById( //
                        goodsRequestDTO.getGoods_id()) //
                .orElseThrow(()  //
                        -> new IllegalArgumentException("상품이 존재하지 않습니다."));

        // cart 객체 생성 및 member, goods 주입
        Cart cart = new Cart();
        CartId cartId = new CartId();
        cartId.setMember_id(member.getId());
        cartId.setGoods_id(goods.getGoods_id());
        cart.setQuantity(goodsRequestDTO.getQuantity());

        // 생성된 cart 를 save
        cart = cartRepository.save(cart);

        return ResponseEntity.status(HttpStatus.OK).body(cart);

    }


}
