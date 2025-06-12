package com.example.pet_back.service;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.ROLE;
import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.GoodsMapper;
import com.example.pet_back.mapper.MemberMapper;
import com.example.pet_back.mapper.OrderMapper;
import com.example.pet_back.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final AddressRepository addressRepository;
    private final GoodsBannerRepository goodsBannerRepository;
    private final FileUploadProperties fileUploadProperties;
    private final CategoryRepository categoryRepository;
    // Mapper
    private final GoodsMapper goodsMapper;
    private final OrderMapper orderMapper;
    private final MemberMapper memberMapper;
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
                              MultipartFile uploadImg, //
                              HttpServletRequest request) throws IOException {
        log.info("** GoodsServiceImpl 실행됨 **");
        System.out.println("에러발생지점 확인용 : " + goodsRequestDTO.getGoodsState().getClass());

        Long category_id = goodsRequestDTO.getCategoryId();
        String goods_name = goodsRequestDTO.getGoodsName();
        int price = goodsRequestDTO.getPrice();
        String description = goodsRequestDTO.getDescription();
        String goods_state = goodsRequestDTO.getGoodsState().name(); // String 변환 후 저장 필수
        String image_file = goodsRequestDTO.getImageFile();
        int quantity = goodsRequestDTO.getQuantity();

        // 이미지 로직
        //  String realPath = "src/main/resources/static/upload/";
        // 1. 파일 저장 경로 준비
        String realPath = "C:/uploads/";

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
        // 컨트롤러에서 직접 받은 uploadImg 사용
        if (uploadImg != null && !uploadImg.isEmpty()) {
            file1 = realPath + uploadImg.getOriginalFilename(); // 서버에 저장할 전체경로
            uploadImg.transferTo(new File(file1)); // 전송 메서드(실제로 저장됨)
            file2 = uploadImg.getOriginalFilename(); // DB 저장용 파일명
        }

        // 이미지 파일명 DTO에 주입 (DB 저장용)
        goodsRequestDTO.setImageFile(file2);

//        MultipartFile upload_img = goodsRequestDTO.getUploadImg();
//        // ㄴ HTML <input type="file" />로 업로드된 파일을 서버에서 받으면 MultipartFile 객체로 처리됨
//        // ㄴ 이 객체는 파일 이름, 크기, MIME 타입, 실제 파일 데이터 등을 포함
//        // 사용자가 업로드한 이미지가 있다면
//        if (upload_img != null && !upload_img.isEmpty()) {
//            file1 = realPath + upload_img.getOriginalFilename(); // 서버에 저장할 전체경로
//            upload_img.transferTo(new File(file1));
//            // 전송 메서드(실제로 저장됨). transferTo()로 실제 바이트 데이터를 복사
//
//            file2 = upload_img.getOriginalFilename();
//            // file2: DB에 저장할 용도. 업로드한 원래 경로+파일명 꺼내 저장함.
//        }

        goodsRequestDTO.setImageFile(file2);
        goodsRepository.registerGoods(category_id, goods_name, price, //
                description, goods_state, file2, quantity);

    }

    // 결제 : Delivery > Orders > Order_Detail 테이블 save
    @Override
    public ResponseEntity<?> payGoods(CustomUserDetails userDetails, //
                                      PayRequestDTO payRequestDTO) {
        System.out.println("GoodsServiceImpl 의 payGoods() 시작");
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
        Delivery delivery = Delivery.builder()
                .member(member).recipient(member.getName()).recipientPhone(member.getPhone()).build();
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
            // OrderDetail 테이블에 저장
            orderDetailRepository.save(orderDetail);
        }

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
        for (OrderResponseDTO o : orderDtoList) {
            System.out.println(o.getOrderId());
        }
        return ResponseEntity.status(HttpStatus.OK).body(orderDtoList);
    }

    // Order Detail 페이지 (order_id)로 주문한 상품의 오더정보 / 상품정보
    @Override
    public ResponseEntity<?> customerGoodsHistory(CustomUserDetails userDetails, List<Long> orderIdList) {
        // 1. 고객정보
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));

        // 2. OrderDetailResponseDTO (Goods / OrderDetail / Order)
        // 2.1) Order 리스트[엔티티]
        List<Orders> ordersList = orderRepository.findAllById(orderIdList);

        // 2.2) Order Detail 리스트[엔티티] : Order 의 ID 이용하여
        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrderIdList(orderIdList);

        // OrderDetailDTO SET
        List<OrderDetailResponseDTO> orderDetailResponseDTOList = orderDetailList.stream() //
                .map(detail -> OrderDetailResponseDTO.builder() //
                        .orderDetailId(detail.getOrderDetailId())
                        .goodsId(detail.getGoods().getGoodsId())
                        .orderId(detail.getOrders().getOrderId())
                        .goodsQuantity(detail.getGoodsQuantity())
                        .goodsPrice(detail.getGoodsPrice())
                        // Goods
                        .goodsName(detail.getGoods().getGoodsName())
                        .price(detail.getGoodsPrice())
                        .description(detail.getGoods().getDescription())
                        .goodsState(detail.getGoods().getGoodsState())
                        .imageFile(detail.getGoods().getImageFile())
                        // Orders
                        .totalPrice(detail.getOrders().getTotalPrice())
                        .totalQuantity(detail.getOrders().getTotalQuantity())
                        .regDate(detail.getOrders().getRegDate())
                        .status(detail.getOrders().getStatus())
                        .build()).collect(Collectors.toList());


        return ResponseEntity.status(HttpStatus.OK).body(orderDetailResponseDTOList);
    }

    // <Delivery /> 페이지 : OrderDetailResponseDTO


    // 결제페이지 - 고객 주소 가져오기
    @Override
    public ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails) {
        // 1. 고객정보
        Member member = memberRepository.findById( //
                        userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        // 2. 주소
        Address memberAddress = addressRepository.findByMemberId(member.getId());
        String address = memberAddress.getAddress1() + " " + memberAddress.getAddress2();
        log.info("주소: " + address);
        return ResponseEntity.status(HttpStatus.OK).body(address);

    }
    //배너 목록 가져오기
    @Override
    public List<BannerDTO> bannerList() {
        List<Goodsbanner> bannerList = goodsBannerRepository.bannerListAll();
        log.info("Banner List => " + bannerList.toString());
        List<BannerDTO> response = new ArrayList<>();

        //수동으로 매핑
        for(Goodsbanner g : bannerList){
            String imagePath = fileUploadProperties.getUrl()+g.getGoods().getImageFile();

            response.add(new BannerDTO(g.getBannerId(),g.getGoods().getGoodsId(),g.getGoods().getGoodsName(),g.getGoods().getCategory().getCategoryName(),imagePath,g.getPosition()));
        }

        log.info("Banner List => " + response.toString());
        return response;
    }

    //카테고리 목록
    @Override
    public List<CategoryResponseDTO> categoryList() {
        List<Category> categoryList = categoryRepository.findAll();

        List<CategoryResponseDTO> response = categoryList.stream().map(goodsMapper::categoryToDto).toList();

        return response;
    }

    //상품 페이징 목록(조해민)
    @Override
    public PageResponseDTO<GoodsSimpleDTO> goodsPageList(PageRequestDTO dto) {
        //요청 페이지, 출력 개수,정렬을 담은 Pageable 객체
        Pageable pageable = PageRequest.of(dto.getPage(), dto.getSize());

        Page<Goods> page;

        if (dto.getKeyword().isEmpty() && dto.getCategory()==0) {
            //전체조회
            log.info("전체 조회 합니다.");
            page = goodsRepository.findSearchList(null,null,pageable);
        } else if (dto.getKeyword().isEmpty() && dto.getCategory() > 0) {
            //키워드는 없고 카테고리로만 검색
            page = goodsRepository.findSearchList(null,dto.getCategory(),pageable);
        }else if(!dto.getKeyword().isEmpty() && dto.getCategory() == 0) {
            //키워드는 있고 카테고리가 전체인 경우
            page = goodsRepository.findSearchList("%" + dto.getKeyword() + "%",null, pageable);
        }else{
            //키워드와 카테고리 모두 적용 검색
            page = goodsRepository.findSearchList("%" + dto.getKeyword() + "%",dto.getCategory(), pageable);
        }

        //페이지의 데이터를 List에 저장
        List<GoodsSimpleDTO> responseList = page.stream().map(goodsMapper::goodsToDto).toList();

        //반환할 ResponseDTO에 데이터들 저장
        PageResponseDTO<GoodsSimpleDTO> response = new PageResponseDTO<>(responseList, dto.getPage(), dto.getSize(), page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious()
        );
        return response;
    }
}
