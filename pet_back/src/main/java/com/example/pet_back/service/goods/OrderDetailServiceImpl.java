package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.domain.admin.GoodsRankDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.domain.goods.OrderDetailResponseDTO;
import com.example.pet_back.domain.goods.WithDrawRequestDTO;
import com.example.pet_back.domain.goods.WithdrawResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.OrderDetailMapper;
import com.example.pet_back.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private final ReviewRepository reviewRepository;
    private final WithDrawRepository withDrawRepository;

    private final OrderDetailMapper orderDetailMapper;

    // 이미지 위치 백엔드 경로 지정
    @Autowired
    private FileUploadProperties fileUploadProperties;

    // 취소 / 교환 / 환불 내역
    @Override
    public ResponseEntity<?> withDrawList(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO){
        log.info("** OrderDetailServiceImpl orderList 실행됨 **");

        // 페이징 + 정렬 ★★★★★
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? //
                Sort.by("regDate").descending() //
                :Sort.by("regDate").ascending();

        // Pageable 객체 : 요청페이지 라인수 정렬 ★★★★★
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);

        // 1. Member
        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() //
                -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        // 2. Orders
        // 취소 / 반품 / 교환 상태 주문 필터링
        List<ORDERSTATE> inValidStates = List.of(ORDERSTATE.WITHDRAW, ORDERSTATE.REFUND, ORDERSTATE.EXCHANGE);
        List<Orders> ordersList = orderRepository.findAllByUserIdWithDraw(member.getId(), inValidStates);
        // 3. Goods
        List<Goods> goodsList = goodsRepository.findAllByUserId(member.getId());

        // 4. OrderDetail List
        // 4-1. Orders Id List
        List<Long> orderIdList = new ArrayList<>();
        for (Orders orders : ordersList) {
            Long orderId = orders.getOrderId();
            orderIdList.add(orderId);
        }
        log.info("** OrderDetailServiceImpl Orders ID List **");

        // 페이징된 OrderDetail 목록 조회 ★★★★★
        Page<OrderDetail> orderDetailPage = orderDetailRepository.findAllByOrderIdList(orderIdList, pageable);
        log.info("** OrderDetailServiceImpl withDrawList => orderDetailPage 조회완료 **");

        // 5. Map (goodsId/GOODS) & (orderId/ORDERS) & (reviewId/REVIEW)
        Map<Long, Goods> goodsMap = goodsList.stream().collect(Collectors.toMap(Goods::getGoodsId, g-> g));
        Map<Long, Orders> ordersMap = ordersList.stream().collect(Collectors.toMap(Orders::getOrderId, o->o));

        // 6. Review
        List<Long> orderDetailIdList = orderDetailPage.stream()
                .map(OrderDetail::getOrderDetailId)
                .collect(Collectors.toList());
        List<Review> reviewList = reviewRepository.findByOrderDetailIdIn(orderDetailIdList);
        Map<Long, Review> reviewMap = reviewList.stream() // OrderDetail Id : Review객체
                .collect(Collectors.toMap(r -> r.getOrderDetail().getOrderDetailId(), r -> r));


        // DTO 리스트 생성
        List<WithdrawResponseDTO> dtoList = orderDetailPage.stream() //
                .map(od ->  {

                    // 상품 정보
                    Goods goods = goodsMap.get(od.getGoods().getGoodsId());
                    GoodsResponseDTO goodsDTO = GoodsResponseDTO.builder()
                            .goodsId(goods.getGoodsId())
                            .categoryId(goods.getCategory().getCategoryId())
                            .goodsName(goods.getGoodsName())
                            .price(goods.getPrice())
                            .description(goods.getDescription())
                            .goodsState(goods.getGoodsState())
                            .imageFile(fileUploadProperties.getStaticUrl() + od.getGoods().getImageFile()) // 백엔드 경로 설정
                            .rating(goods.getRating())
                            .views(goods.getViews())
                            .reviewNum(goods.getReviewNum())
                            .quantity(goods.getQuantity())
                            .regDate(goods.getRegDate())
                            .cartQuantity(0) // 필드가 있다면 초기화
                            .build();

                    Orders order = ordersMap.get(od.getOrders().getOrderId());
                    Review review = reviewMap.get(od.getOrderDetailId());
                    Optional<Withdraw> withdrawOpt = withDrawRepository.findReason(
                            od.getOrders().getOrderId(),
                            od.getGoods().getGoodsId(),
                            member.getId()
                    );
                    OrderDetailResponseDTO orderDetailDTO = OrderDetailResponseDTO.builder()
                            .orderDetailId(od.getOrderDetailId())
                            .goodsId(od.getGoods().getGoodsId())
                            .orderId(order.getOrderId())
                            .goodsQuantity(od.getGoodsQuantity())
                            .goodsPrice(od.getGoodsPrice())
                            .goodsName(goods.getGoodsName())
                            .price(goods.getPrice())
                            .description(goods.getDescription())
                            .goodsState(goods.getGoodsState())
                            .imageFile(fileUploadProperties.getStaticUrl() + od.getGoods().getImageFile()) // 백엔드 경로 설정
                            .totalPrice(order.getTotalPrice())
                            .totalQuantity(order.getTotalQuantity())
                            .regDate(order.getRegDate())
                            .status(order.getStatus().getOrderName())
                            .score(String.valueOf(review != null ? review.getScore() : null))
                            .reviewed(review != null)
                            .build();


                    String reason = withdrawOpt.map(Withdraw::getReason).orElse("사유 없음");
                    return WithdrawResponseDTO.builder() //
                            .memberId(member.getId())
                            .goodsId(od.getGoods().getGoodsId())
                            .orderId(od.getOrders().getOrderId())
                            .quantity(od.getGoodsQuantity())
                            .reason(reason)
                            .returnDate(od.getOrders().getCancelDate())
                            // GoodsResponseDTO
                            .goodsResponseDTO(goodsDTO)
                            // OrderDetailResponseDTO
                            .orderDetailResponseDTO(orderDetailDTO)
                            .build();
                }).collect(Collectors.toList());
        log.info("** OrderDetailServiceImpl withDrawList => dto 리스트 생성 **");

        // PageResponseDTO  생성 ★★★★★
        PageResponseDTO<WithdrawResponseDTO> response = new PageResponseDTO<>(
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


    // 주문 / 배송내역 : status(BEFOREPAY, AFTERPAY, READY, DELIVERY, END)
    @Override
    public ResponseEntity<?> orderList(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO) {
         log.info("** OrderDetailServiceImpl orderList 실행됨 **");

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
        List<ORDERSTATE> validStates = List.of(ORDERSTATE.BEFOREPAY, ORDERSTATE.AFTERPAY, ORDERSTATE.READY, ORDERSTATE.DELIVERY, ORDERSTATE.END);
        List<Orders> ordersList = orderRepository.findAllByUserIdValidState(member.getId(), validStates);
        // List<Orders> ordersList = orderRepository.findAllByUserId(member.getId()); -> 전체조회
        
        log.info("=== 조회된 주문 수: {} ===", ordersList.size());
        ordersList.forEach(order ->
                log.info("OrderId: {}, Status: {}", order.getOrderId(), order.getStatus())
        );

        // 3. Goods
        List<Goods> goodsList = goodsRepository.findAllByUserId(member.getId());

        // 4. OrderDetail List
        // 4-1. Orders Id List
        List<Long> orderIdList = new ArrayList<>();
        for (Orders orders : ordersList) {
            Long orderId = orders.getOrderId();
            orderIdList.add(orderId);
        }
        log.info("** OrderDetailServiceImpl Orders ID List **");

        // 페이징된 OrderDetail 목록 조회 ★★★★★
        Page<OrderDetail> orderDetailPage = orderDetailRepository.findAllByOrderIdList(orderIdList, pageable);
        log.info("** OrderDetailServiceImpl orderDetailPage 조회완료 **");


        // 5. Map (goodsId/GOODS) & (orderId/ORDERS) & (reviewId/REVIEW)
        Map<Long, Goods> goodsMap = goodsList.stream().collect(Collectors.toMap(Goods::getGoodsId, g-> g));
        Map<Long, Orders> ordersMap = ordersList.stream().collect(Collectors.toMap(Orders::getOrderId, o->o));

        // 6. Review
        List<Long> orderDetailIdList = orderDetailPage.stream()
                .map(OrderDetail::getOrderDetailId)
                .collect(Collectors.toList());
        log.info("List<Review> reviewList =");
        List<Review> reviewList = reviewRepository.findByOrderDetailIdIn(orderDetailIdList);
        log.info("Map<Long, Review> reviewMap =");
        // OrderDetailId, Review객체
        Map<Long, Review> reviewMap = reviewList.stream()
                .collect(Collectors.toMap(r -> r.getOrderDetail().getOrderDetailId(), r -> r));

        log.info("DTO리스트 생성");
        // DTO 리스트 생성
        List<OrderDetailResponseDTO> dtoList = orderDetailPage.stream() //
                .map(od ->  {
                    Review review = reviewMap.get(od.getOrderDetailId());
                    int score = review != null ? review.getScore() : 0;
                    return OrderDetailResponseDTO.builder() //
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
                        .imageFile(fileUploadProperties.getStaticUrl() + od.getGoods().getImageFile()) // 백엔드 경로 설정
                        // Orders
                        .totalPrice(od.getOrders().getTotalPrice())
                        .totalQuantity(od.getOrders().getTotalQuantity())
                        .regDate(od.getOrders().getRegDate())
                        .status(od.getOrders().getStatus().getOrderName())
                        // Review
                        .score(String.valueOf(score))
                        .reviewed(od.getReviewed())
                        .build();
                }).collect(Collectors.toList());

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

    // <OrderListAll />
    // 전체 OrderDetail
    @Override
    public PageResponseDTO<OrderDetailResponseDTO> orderDetailAllList(PageRequestDTO pageRequestDTO){
        // 페이징
        // 1. 정렬 조건 설정 :  (최신)
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? // desc 라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        // 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);
        log.info("** 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬 **");

        Page<OrderDetail> orderDetailPage = orderDetailRepository.findAll(pageable);
        List<OrderDetailResponseDTO> dtoList = orderDetailPage.getContent().stream()
                .map(orderDetailMapper::toDTO)
                .collect(Collectors.toList());

        PageResponseDTO<OrderDetailResponseDTO> response = new PageResponseDTO<>(
                dtoList,
                pageRequestDTO.getPage(),
                pageRequestDTO.getSize(),
                orderDetailPage.getTotalElements(),
                orderDetailPage.getTotalPages(),
                orderDetailPage.hasNext(),
                orderDetailPage.hasPrevious()
        );

        return response;

    }

    // <OrderList /> : 주문취소
    @Override
    @Transactional
    public ResponseEntity<?> withdraw(CustomUserDetails userDetails, WithDrawRequestDTO withDrawRequestDTO){
        log.info("** OrderDetailServiceImpl => withdraw() 실행됨 **");
        Member member = memberRepository.findById( //
                userDetails.getMember().getId()).orElseThrow(() //
                -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        Orders order = orderRepository.findById(withDrawRequestDTO.getOrderId()).orElseThrow(() //
                -> new EntityNotFoundException("주문내역이 존재하지 않습니다."));
        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrderId(order.getOrderId());
        List<Long> goodsIds = orderDetailList.stream()
                .map(od -> od.getGoods().getGoodsId()).distinct().toList();

        log.info("orderId = {}",order.getOrderId());
        String orderDetailStr = orderDetailList.stream()
                .map(od -> "OrderDetailId: " + od.getOrderDetailId() + ", GoodsId: " + od.getGoods().getGoodsId())
                .collect(Collectors.joining(" | "));
        log.info("orderDetailList 상세: {}", orderDetailStr);


        // 배송현황 불러옴
        ORDERSTATE orderState = order.getStatus();
        boolean withDraw;
        
        // 배송현황에 따른 취소가능 여부 분기
        if(orderState == ORDERSTATE.BEFOREPAY || orderState == ORDERSTATE.AFTERPAY || orderState == ORDERSTATE.READY){
            try {
                // 취소 테이블 엔티티 준비
                if (order.getCancelDate() == null) {
                    order.setCancelDate(LocalDate.now()); // 현재 날짜
                }
                orderRepository.updateState(withDrawRequestDTO.getReasonType(), order.getOrderId()); // ORDERSTATE 변경
                List<Withdraw> withdrawList = orderDetailList.stream()
                        .map(od -> Withdraw.builder()
                                .memberId(member.getId())
                                .goodsId(od.getGoods().getGoodsId())
                                .orderId(order.getOrderId())
                                .quantity(od.getGoodsQuantity())
                                .reason(withDrawRequestDTO.getReasonDetail())
                                .returnDate(LocalDate.now())
                                .build()
                        )
                        .collect(Collectors.toList());
                withDrawRepository.saveAll(withdrawList);
            } catch (Exception e){
                log.error("취소테이블 저장 또는 주문테이블 업데이트 중 요류 발생");
            }
            withDraw = true; // 취소 허용
            return ResponseEntity.ok(withDraw);
        }else if(orderState == ORDERSTATE.DELIVERY || orderState == ORDERSTATE.END){
            withDraw = false; // 취소 비허용
            return ResponseEntity.ok(withDraw);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청입니다.");
    }


//    // <OrderList /> : 리뷰 중복등록 검증
//    // 리뷰 중복등록 검증
//    @Override
//    public ResponseEntity<?> getReviewState (CustomUserDetails userDetails,Long orderDetailId){
//        Member member = memberRepository.findById( //
//                userDetails.getMember().getId()).orElseThrow(() //
//                -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
//        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId) //
//                .orElseThrow(() -> new NullPointerException("주문상세 내역이 존재하지 않습니다."));
//
//        Review review = reviewRepository
//                .findReviews(member.getId(), orderDetailId));
//        if(review!=null){
//            return ResponseEntity.status(HttpStatus.OK).body(review);
//        }else{
//            return ResponseEntity.status(HttpStatus.OK).body(true);
//        }
//        // return ResponseEntity.status(HttpStatus.OK).body(true);
//    }

}
