package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.GOODSSTATE;
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
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;

    // Mapper
    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;
    private final ReviewMapper reviewMapper;
    private final FileUploadProperties fileUploadProperties;

    // 결제페이지 - 고객 주소 가져오기
    @Override
    @Transactional
    public ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails) {
        // 1. 고객정보
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        // 2. 기본주소 가져오기
        Address memberAddress = addressRepository.findDefaultByMemberId(member.getId());

        // 3. DTO변환
        AddressResponseDTO addressResponseDTO = new AddressResponseDTO();
        addressResponseDTO.setAddressId(memberAddress.getAddressId());
        addressResponseDTO.setAddressName(memberAddress.getAddressName());
        addressResponseDTO.setAddrType(memberAddress.getAddrType().getAddrName());
        addressResponseDTO.setAddress1(memberAddress.getAddress1());
        addressResponseDTO.setAddress2(memberAddress.getAddress2());
        addressResponseDTO.setAddressZip(memberAddress.getAddressZip());

        return ResponseEntity.status(HttpStatus.OK).body(addressResponseDTO);
    }

    // 결제페이지 - 할인율 계산, 결제금액 Preview (백엔드 일괄)
    @Override
    @Transactional
    public PaymentPreviewDTO calculatePaymentPreview(List<Map<String, Object>> goodsList, CustomUserDetails userDetails){
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        // 구매 가경 누적 저장 산출
        int goodsPrice = 0;
        for (Map<String, Object> item : goodsList) {
            int price = ((Number) item.get("price")).intValue();
            int quantity = ((Number) item.get("quantity")).intValue();
            goodsPrice += price * quantity;
        }

        // 배달료
        int deliveryPrice = 3000;

        // 회원등급
        String grade = member.getGrade().getGradeName();
        // 새싹회원0 초급회원0.05 중급회원0.07 상급회원0.1 프리미엄 회원0.2
        double rate = switch (grade) {
            case "초급회원" -> 0.05;
            case "중급회원" -> 0.07;
            case "상급회원" -> 0.10;
            case "프리미엄 회원" -> 0.20;
            default -> 0.0;
        };

        // 최종결제금액
        int disCount = (int) Math.floor(goodsPrice * rate);
        int finalPrice = goodsPrice + deliveryPrice - disCount;
        System.out.println("최종결제금액: "+finalPrice);

        return PaymentPreviewDTO.builder()
                .goodsPrice(goodsPrice)
                .deliveryPrice(deliveryPrice)
                .disCount(disCount)
                .finalPrice(finalPrice)
                .grade(grade)
                .build();
    }


    // 결제 : Delivery > Orders > Order_Detail 테이블 save
    @Override
    @Transactional
    public ResponseEntity<?> payGoods(CustomUserDetails userDetails, //
                                      PayRequestDTO payRequestDTO) {
        System.out.println("OrderServiceImpl 의 payGoods() 시작");
        // 1. Goods List
        List<Long> goodsIds = payRequestDTO.getGoodsList().stream()
                .map(GoodsRequestDTO::getGoodsId)
                .collect(Collectors.toList());
        List<Goods> goodsList = goodsRepository.findAllById(goodsIds);

        // 2. Member
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        System.out.println("member.id = " + member.getId());

        System.out.println("GoodsServiceImpl --------------------------------- 오류확인용 -----------------");

        // 3. Delivery 테이블에 저장 (delivery_id 생성) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Address address = addressRepository.findById(payRequestDTO.getAddressId())
                .orElseThrow(() -> new RuntimeException("해당 주소가 존재하지 않습니다."));
        Delivery delivery = Delivery.builder()
                .member(member).address(address)
                .recipient(member.getName()).recipientPhone(payRequestDTO.getRecipientPhone())
                .deliveryName(payRequestDTO.getDeliveryName())
                .requestMessage(payRequestDTO.getRequestMessage())
                .build();

        Delivery save = deliveryRepository.save(delivery);
        System.out.println("GoodsServiceImpl delivery_id => " + delivery.getDeliveryId());

        // 4. Orders 테이블에 저장 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        int totalQuantity = payRequestDTO.getGoodsList().stream()
                .mapToInt(GoodsRequestDTO::getQuantity).sum(); // 결제페이지로 넘어온 총 수량
        int totalPrice = payRequestDTO.getGoodsList().stream()
                .mapToInt(GoodsRequestDTO::getPrice).sum(); // 결제페이지로 넘어온 총 가격
        Orders order = Orders.builder().delivery(save)
                .member(member).totalQuantity(totalQuantity).totalPrice(totalPrice)
                .payment(payRequestDTO.getPayment()).build();

        Orders orders = orderRepository.save(order);

        member.setTotalPurchaseCount(member.getTotalPurchaseCount()+1);
        member.setTotalPurchasePrice(member.getTotalPurchasePrice()+totalPrice);
        member.setPoint(member.getPoint()+(totalPrice*0.01));

        // 5. Order_Detail 테이블에 저장 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        List<GoodsRequestDTO> requestGoodsList = payRequestDTO.getGoodsList();
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (GoodsRequestDTO requestDTO : requestGoodsList) {
            // Goods
            Goods goods = goodsList.stream()
                    .filter(g -> g.getGoodsId().equals(requestDTO.getGoodsId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("상품이 존재하지 않습니다."));
            // OrderDetail
            OrderDetail orderDetail = OrderDetail.builder()
                    .goods(goods)
                    .orders(orders)
                    .goodsQuantity(requestDTO.getQuantity())
                    .goodsPrice(requestDTO.getPrice())
                    .build();

            orderDetailRepository.save(orderDetail);
        }

        order.setStatus(ORDERSTATE.AFTERPAY);
        // 6. 장바구니에서 수량차감 또는 삭제
        List<Cart> cartList = cartRepository.findCartListByUserId(member.getId());
        for (GoodsRequestDTO requestDTO : requestGoodsList) {
            // Goods 엔티티 가져오기
            Goods goods = goodsList.stream()
                    .filter(g -> g.getGoodsId().equals(requestDTO.getGoodsId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("상품이 존재하지 않습니다."));

            // goods id 로 cart 조회후 삭제 (현재 장바구니 전체에서 삭제하도록 함)
            cartRepository.deleteByGoodsId(goods.getGoodsId());
        }
        System.out.println("OrderServiceImpl 의 payGoods() 끝");
        return ResponseEntity.status(HttpStatus.OK).body("결제가 정상적으로 완료되었습니다."); // orderDetail컴포넌트로 이동
    }//

    // <Delivery /> 페이지 : OrderDetailResponseDTO
    // 배송조회
    @Override
    @Transactional
    public ResponseEntity<?> deliveryStatus(CustomUserDetails userDetails, Long orderId){
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        Orders orders = orderRepository.findById(orderId).orElseThrow(() //
                -> new UsernameNotFoundException("주문내역이 존재하지 않습니다."));


        return null;
    }


    // 리뷰 작성
    @Override
    @Transactional
    public ResponseEntity<?> regReview(CustomUserDetails userDetails, //
                                       ReviewUploadDTO reviewUploadDTO) throws IOException {

        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));


        List<MultipartFile> imageFiles = reviewUploadDTO.getImageFiles();

        // 이미지 로직
        // 1. 파일 저장 경로
        List<String> uploadedFileNames = new ArrayList<>();
        String realPath = "C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/";

        // 2. 업로드 이미지 처리
        if (imageFiles  != null && !imageFiles .isEmpty()) {
            for(MultipartFile imageFile : imageFiles){
                if(!imageFile.isEmpty()){
                    String originalFilename = imageFile.getOriginalFilename(); // ex: cat.jpg
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String uuid = UUID.randomUUID().toString();
                    String newFileName = uuid + extension; // UUID 추가
                    File destFile = new File(realPath + newFileName);
                    imageFile.transferTo(destFile); // MultipartFile 저장
                    uploadedFileNames.add(newFileName); //
                }
            }
        }

        // 이미지 파일명 문자열로 저장
        String uploadImg = String.join(",", uploadedFileNames);
        reviewUploadDTO.setUploadImg(uploadImg);
        reviewUploadDTO.setMemberId(member.getId());

        reviewUploadDTO.setMemberId(member.getId());
        Optional<Goods> goods = goodsRepository.findById(reviewUploadDTO.getGoodsId());
        Optional<OrderDetail> orderDetail = orderDetailRepository.findById(reviewUploadDTO.getOrderDetailId());
        Review review = reviewMapper.toEntity(reviewUploadDTO, member, goods.orElse(null), orderDetail.orElse(null));

        // null 방어 코드
        review.setTitle(StringUtils.hasText(reviewUploadDTO.getTitle()) ? reviewUploadDTO.getTitle() : "");
        review.setContent(StringUtils.hasText(reviewUploadDTO.getContent()) ? reviewUploadDTO.getContent() : "");

        log.info("등록할 리뷰 정보: memberId={}, goodsId={}, orderDetailId={}", member.getId(), review.getGoods().getGoodsId(), review.getOrderDetail().getOrderDetailId());
        log.info("score={}, title={}, content={}, imageFiles={}", review.getScore(), review.getTitle(), review.getContent(), uploadImg);

        try{
            reviewRepository.save(review);
            log.info("** OrderServiceImpl => regReview() reviewRepository.save(review) 완료 **");
            return ResponseEntity.status(HttpStatus.OK).body("리뷰가 정상적으로 등록되었습니다.");
        } catch (Exception e) {
            log.error("리뷰 등록 중 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
        }
    }


    // 내 리뷰 목록 출력
    @Override
    public ResponseEntity<?> showMyReviews(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO){
        System.out.println("OrderServiceImpl 의 showReviewList() 시작");
        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));

        // 페이징
        // 1. 정렬 조건 설정 :  (최신)
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? // desc라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        // 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);
        log.info("** 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬 **");

        // 3. Page<Review> 의 content (DTO에 SET)
        Page<Review> reviewPage =  reviewRepository.findAllByUserId(member.getId(), pageable); // Review List

        List<ReviewResponseDTO> dtoList = reviewPage.getContent().stream()
                .map(reviewMapper::toDTO)
                .toList();

        log.info("** 3. Page<Review> 의 content (DTO에 SET) **");
        log.info("getContent: "+reviewPage.getContent());

        // 4. PageResponseDTO
        PageResponseDTO<ReviewResponseDTO> response = new PageResponseDTO<>(
                dtoList,
                pageRequestDTO.getPage(),
                pageRequestDTO.getSize(),
                reviewPage.getTotalElements(),
                reviewPage.getTotalPages(),
                reviewPage.hasNext(),
                reviewPage.hasPrevious()
        );
        log.info("** 4. PageResponseDTO **");
        return ResponseEntity.status(HttpStatus.OK).body(response);

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
                dto.setImageFile(fileUploadProperties.getUrl()+list.get(0).getGoods().getImageFile());
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
