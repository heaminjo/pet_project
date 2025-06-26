package com.example.pet_back.controller;

import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.MemberService;
import com.example.pet_back.service.goods.OrderDetailService;
import com.example.pet_back.service.goods.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor // private final만
@RequestMapping(value = "/order")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final MemberService memberService;
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 주 문 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // <OrderDetail /> : 주문 리스트
    @PostMapping("/detail")
    public ResponseEntity<?> orderList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** OrderController => orderList() 실행됨 **");
        return orderDetailService.orderList(userDetails, pageRequestDTO);
    }

    // <OrderList /> : 주문취소
    @PostMapping("/withdraw/{orderDetailId}")
    public ResponseEntity<?> withdrawOrder(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long orderDetailId) {
        log.info("** OrderController => withdrawOrder() 실행됨 **");
        orderDetailService.withdraw(userDetails, orderDetailId);
        return ResponseEntity.ok("주문이 취소되었습니다.");
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 관 리 자 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // <DeliveryGoods />
    @PostMapping("/page/list")
    public PageResponseDTO<OrderSimpleDTO> ordersPageList(@RequestBody PageRequestDTO dto){
        log.info("** OrderController => ordersPageList() 실행됨 **");
        return orderService.ordersPageList(dto);
    }

    // 관리자 페이지:
    @PostMapping("/list/all")
    public ResponseEntity<?> orderAllList(@RequestBody PageRequestDTO pageRequestDTO){
        log.info("** OrderController => orderAllList() 실행됨 **");
        return orderService.orderAllList(pageRequestDTO);
    }

    // <OrderListAll />
    @PostMapping("/page/details")
    public PageResponseDTO<OrderDetailResponseDTO> orderDetailAllList(@RequestBody PageRequestDTO pageRequestDTO){
        log.info("** OrderController => orderDetailAllList() 실행됨 **");
        return orderDetailService.orderDetailAllList(pageRequestDTO);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결 제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 결제 메서드
    @PostMapping("/pay")
    public ResponseEntity<?> payGoods(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                      @RequestBody PayRequestDTO dto) {
        log.info("** OrderController => payGoods() 실행됨 **");
        log.info("결제 user = " + userDetails.getMember().getEmail()); // 이게 null?
        System.out.println("deliveryName; "+dto.getDeliveryName());
        System.out.println("recipientPhone; "+dto.getRecipientPhone());
        System.out.println("requestMessage; "+dto.getRequestMessage());
        return orderService.payGoods(userDetails, dto);
    }

    // 결제 시 등급, 등급별 할인율 표시 (백엔드 일괄 처리)
    @PostMapping("/pay/preview")
    public ResponseEntity<PaymentPreviewDTO> getPaymentPreview(
            @RequestBody List<Map<String, Object>> goodsList, // quantity: 1 , .... 등의 goods list
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** OrderController => getPaymentPreview() 실행됨 **");

        return ResponseEntity.ok(orderService.calculatePaymentPreview(goodsList, userDetails));
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 배 송 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @PostMapping("/delivery")
    public ResponseEntity<?> deliveryStatus(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam("orderId") Long orderId) {
        log.info("** OrderController => orderList() 실행됨 **");
        return orderService.deliveryStatus(userDetails, orderId);
    }

    // 고객 주소 가져오기
    @GetMapping("/findaddress")
    public ResponseEntity<?> findMemberAddress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("** OrderController => findMemberAddress() 실행됨 **");
        return orderService.findMemberAddress(userDetails);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리 뷰 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 리뷰 업로드
    @PostMapping("/review/register")
    public ResponseEntity<?> regReview(@AuthenticationPrincipal CustomUserDetails userDetails, //
                                       @RequestPart("review") ReviewUploadDTO reviewUploadDTO,
                                       @RequestPart(value = "imageFile", required = false) List<MultipartFile> imageFiles) {
        log.info("** OrderController => regReview() 실행됨 **");
        try {
            reviewUploadDTO.setImageFiles(imageFiles);
            log.info("** OrderController =>  reviewUploadDTO.setImageFile(imageFile) **");
            return orderService.regReview(userDetails, reviewUploadDTO);
        } catch (Exception e) {
            log.error("** OrderController.regReview Exception => " + e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
        }
    }

    // 리뷰 중복등록 여부 검증
    @GetMapping("/review/state/{orderDetailId}")
    public ResponseEntity<?> getReviewState(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long orderDetailId){
        log.info("** OrderController => getReviewState() 실행됨 **");
        return orderDetailService.getReviewState(userDetails, orderDetailId);
    }

    // 내 리뷰 목록 출력
    @PostMapping("/review/my")
    public ResponseEntity<?> showReviewList(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PageRequestDTO pageRequestDTO) {
        log.info("** OrderController => showReviewList() 실행됨 **");
        return orderService.showMyReviews(userDetails, pageRequestDTO);
    }

    // 리뷰 삭제
    @GetMapping("/review/delete/{reviewId}")
    public ResponseEntity<?> deleteReview( @PathVariable Long reviewId){
        log.info("** OrderController => deleteReview() 실행됨 **");
        return orderService.deleteReview( reviewId);
    }



//        // 내 리뷰 출력 (수정필요)
//    @GetMapping("/reviews/list/{goodsId}")
//    public ResponseEntity<?> showReviewList(@PathVariable("goodsId") Long goodsId, @RequestBody PageRequestDTO pageRequestDTO) {
//        log.info("** GoodsController => reviews() 실행됨 **");
//        return goodsService.showReviewList(goodsId, pageRequestDTO);
//    }



}
