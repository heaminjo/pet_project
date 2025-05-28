package com.example.pet_back.service;

import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.domain.login.GoodsRequestDTO;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.repository.CartRepository;
import com.example.pet_back.repository.GoodsRepository;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService {

    private final CartRepository cartRepository;
    private final GoodsRepository goodsRepository;
    private final MemberRepository memberRepository;

    private final MemberMapper mapper;

    @Override
    public GoodsRequestDTO registerGoods(GoodsRequestDTO goodsRequestDTO) {
        log.info("** GoodsServiceImpl 실행됨 **");

        //  category_id, goods_name, price, description, quantity
        Long category_id = goodsRequestDTO.getCategory_id();
        String goods_name = goodsRequestDTO.getGoods_name();
        int price = goodsRequestDTO.getPrice();
        String description = goodsRequestDTO.getDescription();
        GOODSSTATE goods_state = goodsRequestDTO.getGoods_state();
        String image_file = goodsRequestDTO.getImage_file();
        int quantity = goodsRequestDTO.getQuantity();

        goodsRepository.registerGoods(category_id, goods_name, price, //
                description, goods_state, image_file, quantity);

        return goodsRequestDTO;
    }


}
