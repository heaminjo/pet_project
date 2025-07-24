package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.domain.address.AddressResponseDTO;
import com.example.pet_back.domain.admin.OrderStatisticsDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.OrderDetailMapper;
import com.example.pet_back.mapper.OrderMapper;
import com.example.pet_back.mapper.ReviewMapper;
import com.example.pet_back.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    // Reposiotory
    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final DeliveryRepository deliveryRepository;
    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;

    // Mapper
    private final OrderMapper orderMapper;

    // 이미지 위치 백엔드 경로 지정
    @Autowired
    private FileUploadProperties fileUploadProperties;


    // <Delivery /> 페이지 : OrderDetailResponseDTO
    // 배송조회
    @Override
    @Transactional
    public ORDERSTATE deliveryStatus(CustomUserDetails userDetails, Long orderDetailId){
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElseThrow(() //
                -> new EntityNotFoundException("주문상세내역이 존재하지 않습니다."));
        Goods goods = goodsRepository.findById(orderDetail.getGoods().getGoodsId()).orElseThrow(() //
                -> new EntityNotFoundException("상품이 존재하지 않습니다."));
        Orders order = orderRepository.findById(orderDetail.getOrders().getOrderId()).orElseThrow(() //
                -> new EntityNotFoundException("주문내역이 존재하지 않습니다."));
        ORDERSTATE orderState = orderRepository.findDeliveryStateByOrderId(order.getOrderId());
        return orderState;
    }



    // [관리자페이지] 전체 주문리스트
    @Override
    public ResponseEntity<?> orderAllList(PageRequestDTO pageRequestDTO){
        // 페이징
        // 1. 정렬 조건 설정 :  (최신)
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? // desc라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        // 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);
        log.info("** 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬 **");

        // 3. Page<Orders> 의 content (DTO에 SET)
        Page<Orders> ordersPage = orderRepository.findAll(pageable);
        List<OrderResponseDTO> dtoList = ordersPage.getContent().stream()
                .map(orderMapper::toDto)
                .toList();

        // 4. PageResponseDTO
        PageResponseDTO<ReviewResponseDTO> response = new PageResponseDTO<>(
                dtoList,
                pageRequestDTO.getPage(),
                pageRequestDTO.getSize(),
                ordersPage.getTotalElements(),
                ordersPage.getTotalPages(),
                ordersPage.hasNext(),
                ordersPage.hasPrevious()
        );
        log.info("** 4. PageResponseDTO **");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // [관리자] <DeliveryGoods />
    @Override
    public PageResponseDTO<OrderSimpleDTO> ordersPageList(PageRequestDTO dto) {
        log.info("** OrderDetailServiceImpl => ordersPageList() 실행됨 **");

        //요청 페이지, 출력 개수,정렬을 담은 Pageable 객체
        // 정렬 조건 설정 :  (최신)
        Sort sort = dto.getSortBy().equals("desc") ? // desc라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        Pageable pageable = PageRequest.of(dto.getPage(), dto.getSize(), sort);

        String keyword = dto.getKeyword() != null && !dto.getKeyword().isEmpty()
                ? "%" + dto.getKeyword() + "%" : null;
        Long category = dto.getCategory() != null && dto.getCategory() > 0
                ? dto.getCategory() : null;
        ORDERSTATE state = dto.getState() != null && !dto.getState().equals("all")
                ? ORDERSTATE.valueOf(dto.getState().toUpperCase()) : null;

        Page<Orders> page = orderRepository.findSearchList(keyword, category, state, pageable);

        //페이지의 데이터를 List에 저장
        List<OrderSimpleDTO> responseList = page.stream().map(order -> {
                    Member member = order.getMember(); // 주문한 회원
                    Delivery delivery = deliveryRepository.findById(order.getDelivery().getDeliveryId()) //
                        .orElseThrow(() -> new UsernameNotFoundException("배송 정보가 존재하지 않습니다."));
                    Address address = addressRepository.findById(delivery.getAddress().getAddressId())
                            .orElseThrow(() -> new UsernameNotFoundException("주소 정보가 존재하지 않습니다."));

                    return new OrderSimpleDTO(
                            order.getOrderId(),
                            member.getId(),
                            delivery.getDeliveryId(),
                            order.getRegDate(),
                            order.getTotalPrice(),
                            order.getTotalQuantity(),
                            order.getPayment(),
                            order.getStatus(),
                            // 회원 정보
                            member.getEmail(),
                            member.getName(),
                            member.getPhone(),
                            address.getAddressZip(),
                            address.getAddress1() + " " + address.getAddress2()
                    );})
                .toList();
        log.info("** List<OrderSimpleDTO> responseList 실행됨 **");

        //반환할 ResponseDTO에 데이터들 저장
        PageResponseDTO<OrderSimpleDTO> response  //
                = new PageResponseDTO<>(responseList, dto.getPage(), dto.getSize(),  //
                page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious()
        );
        return response;
    }

    //주문 리스트 3건
    @Override
    public  List<OrderResponseDTO> userOrderList(Long userId) {

        //최근 목록 3개를 가져온다.
        List<Orders> orders = orderRepository.recentOrderList(userId);

        //반환할 리스트
        List<OrderResponseDTO> response = new ArrayList<>();

        for(Orders o : orders){
            //각 주문건에 상품들을 가져온다.
            List<OrderDetail> list = orderDetailRepository.orderDetailList(o.getOrderId());

            OrderResponseDTO dto = orderMapper.toDto(o);
            dto.setTotalGoods(list.size());  //총 상품 건 수 저장
            //만약 비어있지않다면
            if(!list.isEmpty()){
                dto.setImageFile(fileUploadProperties.getStaticUrl()+list.get(0).getGoods().getImageFile());
                dto.setGoodsName(list.get(0).getGoods().getGoodsName());
            }
            response.add(dto);
        }
        return response;
    }

    //주문 통계
    @Override
    public OrderStatisticsDTO orderStatistics(String date) {
        LocalDate today = LocalDate.now();
        LocalDate start;

        switch (date) {
            case "ALL": start = LocalDate.of(2000,1,1); break;
            case "1D": start = today; break;
            case "7D": start = today.minusDays(7); break;
            case "1M": start = today.minusMonths(1); break;
            case "6M": start = today.minusMonths(6); break;
            default: throw new IllegalArgumentException("지원하지 않는 기간: " + date);
        }

        LocalDate end = LocalDate.of(3000,1,1); // 오늘 하루 포함

        OrderStatisticsDTO dto = orderRepository.orderStatistics(start,end);
        return dto;
    }


    // [관리자페이지] 주문 상태 수정
    @Override
    @Transactional
    public ApiResponse orderStateUpdate(Long id, String state) { // ID: OrdersId, ORDERSTATE
        Orders orders = orderRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Map<String,ORDERSTATE > stateMap = Map.of(
                "결제전",ORDERSTATE.BEFOREPAY,
                "결제완료",ORDERSTATE.AFTERPAY,
                "상품준비중",ORDERSTATE.READY,
                "배송중",ORDERSTATE.DELIVERY,
                "배송완료",ORDERSTATE.END
        );

        // getName 성공후 해당 로직은 지움 ~~~~~~~~~~~~~~~~~~~~~~~~~~
        ORDERSTATE newState = null;
        if (stateMap.containsKey(state)) {
            newState = stateMap.get(state);
        } else {
            try {
                newState = ORDERSTATE.valueOf(state.toUpperCase()); // Enum 이름 직접 매칭 시도
            } catch (IllegalArgumentException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 주문 상태입니다: " + state);
            }
        }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        
        orders.setStatus(newState);
        orderRepository.save(orders);
        return new ApiResponse(true,"상품 상태가 ["+state+"] 로 변경되었습니다");
    }
    
}
