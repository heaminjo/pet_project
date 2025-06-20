package com.example.pet_back.service.goods;

import com.example.pet_back.domain.admin.GoodsRankDTO;
import com.example.pet_back.domain.goods.OrderDetailResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Orders;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService{

    private final OrderDetailRepository orderDetailRepository;
    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final DeliveryRepository deliveryRepository;
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;


    // 회원이 주문한 OrderDetail
    @Override
    public ResponseEntity<?> orderList(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO) {
         log.info("** GoodsServiceImpl orderList 실행됨 **");

        // 페이징 + 정렬 ★★★★★
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? //
                Sort.by("regDate").descending() //
                 :Sort.by("regDate").ascending();

        // Pageable 객체 : 요청페이지 라인수 정렬 ★★★★★
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);

        // 1. Member
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()).orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        // 2. Orders
        List<Orders> ordersList = orderRepository.findAllByUserId(member.getId());

        // 3. Goods
        List<Goods> goodsList = goodsRepository.findAllByUserId(member.getId());

        // 4. OrderDetail List
        // 4-1. Orders Id List
        List<Long> orderIdList = new ArrayList<>();
        for (Orders orders : ordersList) {
            Long orderId = orders.getOrderId();
            orderIdList.add(orderId);
        }
        log.info("** GoodsServiceImpl Orders ID List **");

        // 페이징된 OrderDetail 목록 조회 ★★★★★
        Page<OrderDetail> orderDetailPage = orderDetailRepository.findAllByOrderIdList(orderIdList, pageable);
        log.info("** GoodsServiceImpl orderDetailPage 조회완료 **");

        // 5. Map (goodsId/GOODS) & (orderId/ORDERS)
        Map<Long, Goods> goodsMap = goodsList.stream().collect(Collectors.toMap(Goods::getGoodsId, g-> g));
        Map<Long, Orders> ordersMap = ordersList.stream().collect(Collectors.toMap(Orders::getOrderId, o->o));

        // DTO 리스트 생성
        List<OrderDetailResponseDTO> dtoList = orderDetailPage.stream() //
                .map(od ->  OrderDetailResponseDTO.builder() //
                        // OrderDetail
                        .orderDetailId(od.getOrderDetailId())
                        .goodsId(od.getGoods().getGoodsId())
                        .orderId(od.getOrders().getOrderId())
                        .goodsQuantity(od.getGoodsQuantity())
                        .goodsPrice(od.getGoodsPrice())
                        // Goods
                        .goodsName(od.getGoods().getGoodsName())
                        .price(od.getGoods().getPrice())
                        .description(od.getGoods().getDescription())
                        .goodsState(od.getGoods().getGoodsState())
                        .imageFile(od.getGoods().getImageFile())
                        // Orders
                        .totalPrice(od.getOrders().getTotalPrice())
                        .totalQuantity(od.getOrders().getTotalQuantity())
                        .regDate(od.getOrders().getRegDate())
                        .status(od.getOrders().getStatus())
                        .build()
                ).collect(Collectors.toList());

        // PageResponseDTO  생성 ★★★★★
        PageResponseDTO<OrderDetailResponseDTO> response = new PageResponseDTO<>(
                dtoList,
                pageRequestDTO.getPage(),
                pageRequestDTO.getSize(),
                orderDetailPage.getTotalElements(),
                orderDetailPage.getTotalPages(),
                orderDetailPage.hasNext(),
                orderDetailPage.hasPrevious()
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @Override
    public List<GoodsRankDTO> goodsRank() {
        List<GoodsRankDTO> list = orderDetailRepository.goodsRank();

        return list;
    }
}
