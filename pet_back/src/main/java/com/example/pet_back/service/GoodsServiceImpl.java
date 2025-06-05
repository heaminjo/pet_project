package com.example.pet_back.service;

import com.example.pet_back.domain.goods.GoodsRequestDTO;
import com.example.pet_back.domain.goods.GoodsResponseDTO;
import com.example.pet_back.domain.goods.OrderResponseDTO;
import com.example.pet_back.domain.goods.PayRequestDTO;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.GoodsMapper;
import com.example.pet_back.mapper.OrderMapper;
import com.example.pet_back.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService {

    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final DeliveryRepository deliveryRepository;
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    // Mapper
    private final GoodsMapper goodsMapper;
    private final OrderMapper orderMapper;

    // 상품상세정보
    @Override
    public ResponseEntity<?> selectOne(Long goods_id) {
        log.info("** GoodsServiceImpl 실행됨 **");
        Goods goods = goodsRepository.findById(goods_id).get();
        return ResponseEntity.status(HttpStatus.OK).body(goods);
    }


    // 상품리스트 출력
    @Override
    public ResponseEntity<?> showGoodsList() {
        log.info("** GoodsServiceImpl 실행됨 **");
        List<Goods> goodsEntities = goodsRepository.findAll();

        // Entity 리스트 -> DTO 리스트 변환:  stream + map + collect 조합 사용
        List<GoodsResponseDTO> goodsList = goodsEntities //
                .stream().map(goodsMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(goodsList);
    }

    // 상품등록
    @Override
    public void registerGoods(GoodsRequestDTO goodsRequestDTO, //
                              HttpServletRequest request) throws IOException {
        log.info("** GoodsServiceImpl 실행됨 **");
        System.out.println("에러발생지점 확인용 : " + goodsRequestDTO.getGoods_state().getClass());

        // 등록할 상품정보 SET
        Long category_id = goodsRequestDTO.getCategory_id();
        String goods_name = goodsRequestDTO.getGoods_name();
        int price = goodsRequestDTO.getPrice();
        String description = goodsRequestDTO.getDescription();
        String goods_state = goodsRequestDTO.getGoods_state().name(); // String 변환 후 저장 필수
        String image_file = goodsRequestDTO.getImage_file();
        int quantity = goodsRequestDTO.getQuantity();

        // 이미지 로직
        //  String realPath = "src/main/resources/static/upload/";
        // 1. 파일 저장 경로 준비
        String realPath = request.getServletContext().getRealPath("/");
        realPath += "resources\\uploadImages\\";

        // 2. 기본 이미지 복사 처리
        File file = new File(realPath); // 파일 또는 디렉토리를 참조하는 File 객체생성
        if (!file.exists()) file.mkdir(); // null인경우 경로 생성(최초1회)
        file = new File(realPath + "basicman.png");
        if (!file.exists()) {
            String basicmanPath = "C:\\MTest\\MyFront\\images\\basicman.png";
            FileInputStream fin = new FileInputStream(new File(basicmanPath));
            FileOutputStream fout = new FileOutputStream(file);
            FileCopyUtils.copy(fin, fout); // Spring이 제공하는 유틸리티클래스 (파일복사)
        }

        // 3. 업로드 이미지 처리
        String file1 = "", file2 = "basicman.png";
        MultipartFile upload_img = goodsRequestDTO.getUpload_img();
        // ㄴ HTML <input type="file" />로 업로드된 파일을 서버에서 받으면 MultipartFile 객체로 처리됨
        // ㄴ 이 객체는 파일 이름, 크기, MIME 타입, 실제 파일 데이터 등을 포함

        // 사용자가 업로드한 이미지가 있다면
        if (upload_img != null && !upload_img.isEmpty()) {
            file1 = realPath + upload_img.getOriginalFilename(); // 서버에 저장할 전체경로
            upload_img.transferTo(new File(file1));
            // 전송 메서드(실제로 저장됨). transferTo()로 실제 바이트 데이터를 복사

            file2 = upload_img.getOriginalFilename();
            // file2: DB에 저장할 용도. 업로드한 원래 경로+파일명 꺼내 저장함.
        }
        goodsRequestDTO.setImage_file(file2);
        goodsRepository.registerGoods(category_id, goods_name, price, //
                description, goods_state, image_file, quantity);

    }

    // 결제 : Delivery > Orders > Order_Detail 테이블 save
    @Override
    public ResponseEntity<?> payGoods(CustomUserDetails userDetails, //
                                      PayRequestDTO payRequestDTO) {
        System.out.println("GoodsServiceImpl 의 payGoods() 시작");
        // 1. Goods List
        List<Long> goodsIds = payRequestDTO.getGoodsList().stream()
                .map(GoodsRequestDTO::getGoods_id)
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
        Delivery delivery = Delivery.builder()
                .member(member).recipient(member.getName()).recipient_phone(member.getPhone()).build();
        Delivery save = deliveryRepository.save(delivery);
        System.out.println("GoodsServiceImpl delivery_id => " + delivery.getDelivery_id());

        // 4. Orders 테이블에 저장 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        int totalQuantity = payRequestDTO.getGoodsList().stream()
                .mapToInt(GoodsRequestDTO::getQuantity).sum(); // 결제페이지로 넘어온 총 수량
        int totalPrice = payRequestDTO.getGoodsList().stream()
                .mapToInt(GoodsRequestDTO::getPrice).sum(); // 결제페이지로 넘어온 총 가격
        Orders order = Orders.builder().delivery(save)
                .member(member).total_quantity(totalQuantity).total_price(totalPrice)
                .payment(payRequestDTO.getPayment()).build();
        Orders orders = orderRepository.save(order);

        // 5. Order_Detail 테이블에 저장 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        List<GoodsRequestDTO> requestGoodsList = payRequestDTO.getGoodsList();
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (GoodsRequestDTO requestDTO : requestGoodsList) {
            // Goods
            Goods goods = goodsList.stream()
                    .filter(g -> g.getGoods_id().equals(requestDTO.getGoods_id()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("상품이 존재하지 않습니다."));
            // OrderDetail
            OrderDetail orderDetail = OrderDetail.builder()
                    .goods(goods)
                    .orders(orders)
                    .goods_quantity(requestDTO.getQuantity())
                    .goods_price(requestDTO.getPrice())
                    .build();
            // OrderDetail 테이블에 저장
            orderDetailRepository.save(orderDetail);
        }

        // 6. 장바구니에서 수량차감 또는 삭제
        List<Cart> cartList = cartRepository.findCartListByUserId(member.getId());
        for (GoodsRequestDTO requestDTO : requestGoodsList) {
            // Goods 엔티티 가져오기
            Goods goods = goodsList.stream()
                    .filter(g -> g.getGoods_id().equals(requestDTO.getGoods_id()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("상품이 존재하지 않습니다."));

            // goods id 로 cart 조회후 삭제 (현재 장바구니 전체에서 삭제하도록 함)
            cartRepository.deleteByGoodsId(goods.getGoods_id());
        }
        System.out.println("GoodsServiceImpl 의 payGoods() 끝");
        return ResponseEntity.status(HttpStatus.OK).body("결제가 정상적으로 완료되었습니다."); // orderDetail컴포넌트로 이동
    }//

    // 주문내역(List) 출력하기 ====================================================================
    @Override
    public ResponseEntity<?> orderList(CustomUserDetails userDetails) {
        log.info("** GoodsServiceImpl orderList 실행됨 **");
        // 1. 고객정보
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));

        // 2. OrderDetail 테이블 조회 : member_id & reg_date
        // order_detail에서 최신 날짜 DESC 정렬 (+orders, goods)
        List<Orders> orderList = orderRepository.findAllByUserId(member.getId());
        List<OrderResponseDTO> orderDtoList = orderMapper.toDtoList(orderList); // order_detail, orders, goods

        return ResponseEntity.status(HttpStatus.OK).body(orderDtoList);
    }

    // 특정 고객이 한번이라도 주문한 적 있는 상품의 리스트
    @Override
    public ResponseEntity<?> customerGoodsHistory(CustomUserDetails userDetails) {
        // 1. 고객정보
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        List<Goods> goodsList = goodsRepository.findAllByUserId(member.getId());
        return ResponseEntity.status(HttpStatus.OK).body(goodsList);
    }


}
