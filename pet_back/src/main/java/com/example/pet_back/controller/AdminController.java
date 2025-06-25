package com.example.pet_back.controller;

import com.example.pet_back.domain.admin.*;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.member.MemberResponseDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.AdminService;
import com.example.pet_back.service.ImageService;
import com.example.pet_back.service.MemberService;
import com.example.pet_back.service.goods.GoodsService;
import com.example.pet_back.service.goods.OrderDetailService;
import com.example.pet_back.service.goods.OrderService;
import jakarta.persistence.criteria.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final MemberService memberService;
    private final AdminService adminService;
    private final GoodsService goodsService;
    private final OrderService orderService;
    private final ImageService imageService;
    private final OrderDetailService orderDetailService;
    //관리자 조회
    @GetMapping("/detail")
    public ResponseEntity<?> memberDetail(@AuthenticationPrincipal CustomUserDetails userDetails) {

        return memberService.selectOne(userDetails);
    }

    //회원 목록 검색 리스트
    @PostMapping("/list/search")
    public ResponseEntity<PageResponseDTO<MemberResponseDTO>> memberSearchList(@RequestBody PageRequestDTO dto) {
        return ResponseEntity.ok(adminService.memberSearchList(dto));
    }

    //회원 상세조회
    @GetMapping("/user/detail")
    public ResponseEntity<?> adminUserDetail(@RequestParam("id") Long id) {
        return adminService.adminUserDetail(id);
    }

    //회원 상태 변경
    @PostMapping("/user/state/update")
    public ResponseEntity<?> userStateUpdate(@RequestBody UserStateUpdateDTO dto) {
        return adminService.userStateUpdate(dto);
    }

    //통계
    @GetMapping("/statistics")
    public ResponseEntity<MemberStatisticsDTO> memberStatistics() {
        return ResponseEntity.ok(adminService.memberStatistics());
    }

    //등급 통계
    @GetMapping("/statistics/grade")
    public ResponseEntity<Map<String, GradeStatisticsDTO>> gradeStatistics() {
        return ResponseEntity.ok(adminService.gradeStatistics());
    }

    //각 등급 포인트 역순 리스트
    @GetMapping("/best/list")
    public ResponseEntity<List<MemberResponseDTO>> userBestList(@RequestParam("grade") String grade) {
        return ResponseEntity.ok(adminService.userBestList(grade));
    }

    //등급 업그레이드
    @PutMapping("/upgrade")
    public ResponseEntity<ApiResponse> gradeUpgrade(@RequestBody UpgradeRequstDTO dto) {
        return ResponseEntity.ok(adminService.upgradeGrade(dto));
    }

    //배너 삭제
    @DeleteMapping("/banner/delete")
    public ResponseEntity<ApiResponse>bannerDelete(@RequestParam("id") Long id){
        return ResponseEntity.ok(adminService.bannerDelete(id));
    }
    //배너 추가(조해민)
    @PostMapping("/banner/insert")
    public ResponseEntity<ApiResponse> goodsPageList(@RequestParam ("file") MultipartFile file, @RequestParam("position") int position){
        return ResponseEntity.ok(imageService.bannerInsert(file,position));
    }

    //베스트 상품 추가(조해민)
    @PostMapping("/best/insert")
    public ResponseEntity<ApiResponse> bestInsert(@RequestBody BestInsertDTO dto){

        return ResponseEntity.ok(goodsService.bestInsert(dto));
    }
    //베스트 삭제
    @DeleteMapping("/best/delete")
    public ResponseEntity<ApiResponse>bestDelete(@RequestParam("id") Long id){
        return ResponseEntity.ok(adminService.bestDelete(id));
    }

    //카테고리 추가
    @PostMapping("/category/insert")
    public ResponseEntity<ApiResponse> categoryInsert(@RequestBody Map<String,String> body){
        String name = body.get("categoryName");
        return ResponseEntity.ok(goodsService.categoryInsert(name));
    }

    //카테고리 삭제
    @DeleteMapping("/category/delete")
    public ResponseEntity<ApiResponse> categoryDelete(@RequestParam ("id") Long id){
        return ResponseEntity.ok(goodsService.categoryDelete(id));
    }

    //카테고리 삭제
    @PatchMapping("/category/update")
    public ResponseEntity<ApiResponse> categoryUpdate(@RequestParam ("id") Long id,@RequestParam("categoryName") String categoryName){
        return ResponseEntity.ok(goodsService.categoryUpdate(id,categoryName));
    }

    //상품 재고 수정
    @PatchMapping("/goods/quantity/update")
    public ResponseEntity<ApiResponse> quantityUpdate(@RequestParam ("id") Long id,@RequestParam("quantity")int  quantity){
        return ResponseEntity.ok(goodsService.quantityUpdate(id,quantity));
    }

    //상품 상태 수정
    @PatchMapping("/goods/state/update")
    public ResponseEntity<ApiResponse> goodsStateUpdate(@RequestParam ("id") Long id,@RequestParam("state")String  state){
        return ResponseEntity.ok(goodsService.goodsStateUpdate(id,state));
    }

    //매출통계
    @GetMapping("/statistics/order")
    public ResponseEntity<OrderStatisticsDTO> orderStatistics(@RequestParam ("date") String date){
        return ResponseEntity.ok(orderService.orderStatistics(date));
    }

    //상품 순위 통계
    @GetMapping("/statistics/goods/rank")
    public ResponseEntity<List<GoodsRankDTO>> goodsRank() {
        return ResponseEntity.ok(orderDetailService.goodsRank());
    }

    //주문 상태 수정
    @PatchMapping("/order/state/update")
    public ResponseEntity<ApiResponse> orderStateUpdate(@RequestParam ("id") Long id,@RequestParam("state")String  state){
        return ResponseEntity.ok(orderService.orderStateUpdate(id,state));
    }

}
