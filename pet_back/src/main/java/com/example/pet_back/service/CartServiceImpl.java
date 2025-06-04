package com.example.pet_back.service;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.GoodsMapper;
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

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final GoodsRepository goodsRepository;
    private final MemberRepository memberRepository;
    private final GoodsMapper goodsMapper;
    private final MemberMapper memberMapper;

    // 장바구니 리스트 출력
    @Override
    public ResponseEntity<?> selectList(CustomUserDetails userDetails) {
        log.info("** CartServiceImpl 실행됨 **");

        // 1. 유저 details에서 id 가져와 회원을 가져온다.
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));

        // 2. Cart List
        List<Cart> cartEntities = cartRepository.findCartListByUserId(member.getId()); // Cart List

        // 3. Goods List
        List<Long> goodsIdList = new ArrayList<>();
        for (Cart cartEntity : cartEntities) {
            Long goodsId = cartEntity.getGoods_id(); // Cart에서 goods_id 추출 => List
            goodsIdList.add(goodsId);
        }

        // 4. Cart List 의 goods_id 이용해 Goods List 생성
        List<Goods> goodsList = goodsRepository.findAllById(goodsIdList); // Goods List
        List<GoodsResponseDTO> goodsResponseDTOList = goodsMapper.toDtoList(goodsList);

//        // 장바구니의 수량이 필요할시 아래 주석 해제후 사용.
//        // 4-1. Cart List 를 goodsId 기준으로 Map으로
//        Map<Long, Integer> goodsIdToQuantityMap = cartEntities.stream()
//                .collect(Collectors.toMap(Cart::getGoods_id, Cart::getQuantity)); // quantity: Cart
//        // 4.2. Goods List에 Cart 의 Quantity 반영
//        for (Goods goods : goodsList) {
//            Integer quantity = goodsIdToQuantityMap.get(goods.getGoods_id());
//            goods.setQuantity(quantity);
//        }

        log.info("확인");
        log.info(goodsResponseDTOList.toString());
        return ResponseEntity.status(HttpStatus.OK).body(goodsResponseDTOList);
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
            GoodsResponseDTO goodsResponseDTO = goodsMapper.toDto(goods);
            return ResponseEntity.status(HttpStatus.OK).body(goodsResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("상품을 장바구니에 추가하는 도중 오류가 발생하였습니다.");
        }
    }


}
