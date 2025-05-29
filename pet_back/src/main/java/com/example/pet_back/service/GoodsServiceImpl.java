package com.example.pet_back.service;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.CartRepository;
import com.example.pet_back.repository.GoodsRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService {

    private final CartRepository cartRepository;
    private final GoodsRepository goodsRepository;
    private final MemberRepository memberRepository;

    private final MemberMapper mapper;

    // 상품리스트 출력
    @Override
    public ResponseEntity<?> showGoodsList() {
        log.info("** GoodsServiceImpl 실행됨 **");
        List<GoodsResponseDTO> goodsList = goodsRepository.showGoodsList();
        return ResponseEntity.status(HttpStatus.OK).body(goodsList);
    }

    // 상품등록
    @Override
    public void registerGoods(GoodsRequestDTO goodsRequestDTO) {
        log.info("** GoodsServiceImpl 실행됨 **");
        System.out.println("에러발생지점 확인용 : " + goodsRequestDTO.getGoods_state().getClass());

        //  category_id, goods_name, price, description, quantity
        Long category_id = goodsRequestDTO.getCategory_id();
        String goods_name = goodsRequestDTO.getGoods_name();
        int price = goodsRequestDTO.getPrice();
        String description = goodsRequestDTO.getDescription();
        String goods_state = goodsRequestDTO.getGoods_state().name(); // String 변환 후 저장 필수
        String image_file = goodsRequestDTO.getImage_file();
        int quantity = goodsRequestDTO.getQuantity();

        goodsRepository.registerGoods(category_id, goods_name, price, //
                description, goods_state, image_file, quantity);

    }


}
