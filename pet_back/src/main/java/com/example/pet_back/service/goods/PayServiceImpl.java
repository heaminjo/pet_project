package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.ORDERSTATE;
import com.example.pet_back.domain.address.AddressResponseDTO;
import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.domain.goods.PaymentPreviewDTO;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.OrderDetailMapper;
import com.example.pet_back.mapper.OrderMapper;
import com.example.pet_back.mapper.ReviewMapper;
import com.example.pet_back.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{

    // Reposiotory
    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final DeliveryRepository deliveryRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final WithDrawRepository withdrawRepository;

    // Mapper
    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;
    private final ReviewMapper reviewMapper;

    // 이미지 위치 백엔드 경로 지정
    @Autowired
    private FileUploadProperties fileUploadProperties;


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
            if(null != cartRepository.findByGoodsId(goods.getGoodsId())){
                cartRepository.deleteByGoodsId(goods.getGoodsId());
            }
        }
        System.out.println("OrderServiceImpl 의 payGoods() 끝");
        return ResponseEntity.status(HttpStatus.OK).body("결제가 정상적으로 완료되었습니다."); // orderDetail컴포넌트로 이동
    }//

}
