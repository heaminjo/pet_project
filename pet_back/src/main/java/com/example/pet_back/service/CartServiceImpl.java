package com.example.pet_back.service;

import com.example.pet_back.domain.goods.CartResponseDTO;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.CartMapper;
import com.example.pet_back.mapper.MemberMapper;
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
    private final CartMapper cartMapper;
    private final MemberMapper memberMapper;

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

//        List<Cart> cartEntities = cartRepository.findCartListByUserId(member.getId());
//        List<CartResponseDTO> cartList = cartEntities //
//                .stream().map(cartMapper::toDto).collect(Collectors.toList());

        log.info("확인");
        log.info(cartList.toString());
        return ResponseEntity.status(HttpStatus.OK).body(cartList);

    }

    // 상품을 장바구니에 추가
    @Override
    public ResponseEntity<?> addToCart(CustomUserDetails userDetails, //
                                       GoodsRequestDTO goodsRequestDTO) {
        System.out.println("** goodsRequestDTO goods_id : " + goodsRequestDTO.getGoods_id());
        log.info("** CartServiceImpl 실행됨 **");
        // 1. 현재 상태 확인
        // member 불러옴
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        System.out.println("** member.getId() : " + member.getId());
        // goods 불러옴
        Goods goods = goodsRepository.findById( //
                        goodsRequestDTO.getGoods_id()) //
                .orElseThrow(()  //
                        -> new IllegalArgumentException("상품이 존재하지 않습니다."));

        // 2. 조건 설정 (Builder 패턴 연습용, 이 부분은 해당 코드에서는 사용되지 않으므로 지워도 무방합니다.)
        // 엔티티에 값 SET
        Cart cart = Cart.builder() //
                .goods_id(goods.getGoods_id()) //
                .member_id(member.getId()) //
                .quantity(goods.getQuantity()) //
                .build();

        // 3. 수행
        // INSERT 수행
        if (cartRepository.addToCart(member.getId(), goods.getGoods_id(), goods.getQuantity()) > 0) {
            CartResponseDTO cartResponseDTO = cartMapper.toDto(cart);
            cartResponseDTO.setGoods_name(goods.getGoods_name());
            return ResponseEntity.status(HttpStatus.OK).body(cartResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("상품을 장바구니에 추가하는 도중 오류가 발생하였습니다.");
        }
    }


}
