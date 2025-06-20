package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.domain.address.AddressResponseDTO;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.OrderMapper;
import com.example.pet_back.mapper.ReviewMapper;
import com.example.pet_back.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
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

        log.info(""+member.getTotalPurchaseCount());

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

    // 리뷰 작성
    @Override
    @Transactional
    public ResponseEntity<?> regReview(CustomUserDetails userDetails, //
                                       ReviewUploadDTO reviewUploadDTO) throws IOException {
        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        log.info("member.getId() = "+member.getId());

        MultipartFile imageFile = reviewUploadDTO.getImageFile();
        String uploadImg = null;

        // 이미지 로직
        // 1. 파일 저장 경로
        String realPath = "C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/";

        // 2. 업로드 이미지 처리
        if (imageFile != null && !imageFile.isEmpty()) {
            String originalFilename = imageFile.getOriginalFilename(); // ex: cat.jpg
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uuid = UUID.randomUUID().toString();
            String newFileName = uuid + extension;
            File destFile = new File(realPath + newFileName);
            imageFile.transferTo(destFile); // MultipartFile 저장
            uploadImg = newFileName;
        }

        reviewUploadDTO.setMemberId(member.getId());
        Optional<Goods> goods = goodsRepository.findById(reviewUploadDTO.getGoodsId());
        Optional<OrderDetail> orderDetail = orderDetailRepository.findById(reviewUploadDTO.getOrderDetailId());
        Review review = reviewMapper.toEntity(reviewUploadDTO, member, goods.orElse(null), orderDetail.orElse(null));

        log.info("memberId = "+review.getMember().getId()+", goodsId = "+review.getGoods().getGoodsId()+", orderDetailId = "+review.getOrderDetail().getOrderDetailId());
        log.info("score = "+review.getScore()+", title = "+review.getTitle()+", content = "+review.getContent()+", imageFile = "+review.getImageFile());

        try{
              reviewRepository.save(review);
            log.info("** OrderServiceImpl => regReview() reviewRepository.save(review) 완료 **");
            return ResponseEntity.status(HttpStatus.OK).body("리뷰가 정상적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
        }
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

            log.info(list.toString());
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
}
