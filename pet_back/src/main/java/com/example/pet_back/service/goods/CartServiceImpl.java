package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.Cart;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.GoodsMapper;
import com.example.pet_back.repository.CartRepository;
import com.example.pet_back.repository.GoodsRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final GoodsRepository goodsRepository;
    private final MemberRepository memberRepository;
    private final GoodsMapper goodsMapper;

    // 이미지 위치 백엔드 경로 지정
    @Autowired
    private FileUploadProperties fileUploadProperties;

    // 장바구니 리스트 출력
    @Override
    public ResponseEntity<?> selectList(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO) {
        log.info("** CartServiceImpl selectList 실행됨 **");

        // 1. 유저 details에서 id 가져와 회원을 가져온다.
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        System.out.println("member.getName() => " + member.getName());

        // 2. Cart List
        // 페이징
        // 정렬 (최신)
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? // desc라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        // Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);
        Page<Cart> page = cartRepository.findCartList(member.getId(), pageable); // CartList


        // 3. Goods List
        // List<Cart> cartEntities = cartRepository.findCartListByUserId(member.getId()); // Cart List
        List<Long> goodsIdList = new ArrayList<>();
        for (Cart cartEntity : page) {
            Long goodsId = cartEntity.getGoodsId(); // Cart에서 goods_id 추출 => List
            goodsIdList.add(goodsId);
            System.out.println("cart 의 수량 => " + cartEntity.getQuantity());
        }

        // 4. Cart List 의 goods_id 이용해 Goods List 생성
        List<Goods> goodsList = goodsRepository.findAllById(goodsIdList); // Goods List
        List<GoodsResponseDTO> goodsResponseDTOList = goodsMapper.toDtoList(goodsList);

        // 5, 장바구니 수량 적용 로직
        // 5-1. Cart List 를 goodsId 기준으로 Map으로
        Map<Long, Integer> goodsIdToQuantityMap = page.stream()
                .collect(Collectors.toMap(Cart::getGoodsId, Cart::getQuantity)); // quantity: Cart
        // 5.2. Goods List에 Cart 의 Quantity 반영
        for (GoodsResponseDTO dto : goodsResponseDTOList) {
            Integer quantity = goodsIdToQuantityMap.get(dto.getGoodsId());
            dto.setCartQuantity(quantity);
            dto.setImageFile(fileUploadProperties.getUrl() + dto.getImageFile()); // 백엔드 이미지경로 지정
        }

        // 6. 반환할 ResponseDTO 에 List 저장 (goodsResponseDTOList)
        PageResponseDTO<GoodsResponseDTO> response = new PageResponseDTO<>( //
                goodsResponseDTOList, //
                pageRequestDTO.getPage(), pageRequestDTO.getSize(),  //
                page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious());

        log.info(response.toString());
        log.info("** CartServiceImpl selectList 끝 **");


        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 상품을 장바구니에 추가
    @Override
    public ResponseEntity<?> addToCart(CustomUserDetails userDetails, //
                                       Long goodsId, int quantity) {
        System.out.println("** goodsRequestDTO goods_id : " + goodsId);
        log.info("** CartServiceImpl 실행됨 **");
        log.info("userDetails: " + userDetails);

        // member 불러옴
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        System.out.println("** member.getId() : " + member.getId());

        // INSERT 수행
        if (cartRepository.addToCart(member.getId(), goodsId, quantity, LocalDate.now()) > 0) {
            log.info("** cartRepository.addToCart() 실행됨 **");
            return ResponseEntity.status(HttpStatus.OK).body("상품이 성공적으로 등록되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("상품을 장바구니에 추가하는 도중 오류가 발생하였습니다.");
        }
    }


}
