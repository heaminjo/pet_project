package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.domain.goods.ReviewResponseDTO;
import com.example.pet_back.domain.goods.ReviewUploadDTO;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.Goods;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.OrderDetail;
import com.example.pet_back.entity.Review;
import com.example.pet_back.jwt.CustomUserDetails;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    // Reposiotory
    private final GoodsRepository goodsRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;

    // Mapper
    private final ReviewMapper reviewMapper;

    // 이미지 위치 백엔드 경로 지정
    @Autowired
    private FileUploadProperties fileUploadProperties;
    // 리뷰 작성
    @Override
    @Transactional
    public ResponseEntity<?> regReview(CustomUserDetails userDetails, //
                                       ReviewUploadDTO reviewUploadDTO) throws IOException {
        // 1. Entity 조회
        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        Goods goods = goodsRepository.findById(reviewUploadDTO.getGoodsId()) //
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 상품입니다."));
        OrderDetail orderDetail = orderDetailRepository.findById(reviewUploadDTO.getOrderDetailId())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 주문상세입니다."));

        // 2. 이미지 로직
        List<MultipartFile> imageFiles = reviewUploadDTO.getImageFiles();

        // 2-1. 파일 저장 경로
        List<String> uploadedFileNames = new ArrayList<>();
        String realPath = fileUploadProperties.getReviewPath();

        // 2-2. 업로드 이미지 처리
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
                    log.info("업로드이미지 = "+newFileName);
                }
            }
        }

        // 3. DTO SET
        // 3-1. 이미지 파일명 문자열로 저장
        String uploadImg = String.join(",", uploadedFileNames);
        reviewUploadDTO.setUploadImg(uploadImg);

        // 3-2. 기타 정보 SET
        reviewUploadDTO.setMemberId(member.getId());

        // 4. 등록/수정 분기
        Optional<Review> preReview = reviewRepository.findReviews(member.getId(), reviewUploadDTO.getOrderDetailId());
        Review updateReview; // 수정된 리뷰 엔티티
        double rating; // 상품 자체 별점
        try {
            // 최초 등록 vs 업데이트 분기
            if(!preReview.isPresent()) { // 최초 등록인 경우
                updateReview = reviewMapper.toEntity(reviewUploadDTO, member, goods, orderDetail);
                updateReview.setRegDate(LocalDate.now());

                // 등록 시 Goods 에도 review 추가함
                goods.setReviewNum(goods.getReviewNum()+1); // 리뷰 + 1

                // 별점 상품에 반영 (신규인 경우)
                // score1, score2 둘다 같은 값 저장
                updateReview.setScore(reviewUploadDTO.getScore());
                updateReview.setScoreNew(reviewUploadDTO.getScore());
                if(goods.getRating() == 0){
                    rating = reviewUploadDTO.getScore();
                }else{
                    rating = (goods.getRating() + reviewUploadDTO.getScore())/2;
                }
                log.info("상품에 매겨질 별점: "+rating);

                // 주문상세 : setReviewed
                orderDetail.setReviewed(true);
                log.info("orderDetail.setIsReviewed(true) 후: "+orderDetail.getReviewed());
                orderDetailRepository.save(orderDetail);

            }else{ // 리뷰 수정의 경우
                updateReview = preReview.get(); // 기존 엔티티 복사
                updateReview.setModDate(LocalDate.now());
                // 별점 상품에 반영 (수정의 경우)
                // score 2 -> score 1 복사
                updateReview.setScore(updateReview.getScoreNew());
                // score2에는 uploadDTO 의 정보 저장
                updateReview.setScoreNew(reviewUploadDTO.getScore());
                // goods의 별점 * 2 - score1
                if(goods.getRating() == 0){
                    rating = reviewUploadDTO.getScore();
                }else{
                    rating = (goods.getRating() * 2 - updateReview.getScore());
                }
                updateReview.setImageFile(uploadImg);
                updateReview.setModDate(LocalDate.now());

            }

            // 4-3. 제목 / 내용 미입력한 경우 null 예외 방어
            updateReview.setTitle(StringUtils.hasText(reviewUploadDTO.getTitle()) ? reviewUploadDTO.getTitle() : "");
            updateReview.setContent(StringUtils.hasText(reviewUploadDTO.getContent()) ? reviewUploadDTO.getContent() : "");
            log.info("등록할 리뷰 정보: memberId={}, goodsId={}, orderDetailId={}", member.getId(), updateReview.getGoods().getGoodsId(), updateReview.getOrderDetail().getOrderDetailId());
            log.info("score={}, title={}, content={}, imageFiles={}", updateReview.getScore(), updateReview.getTitle(), updateReview.getContent(), updateReview.getImageFile());

            goods.setRating(rating);
            goodsRepository.save(goods);
            reviewRepository.save(updateReview); // 저장

            // 주문상세에도 상태 업데이트, orderDetailID 업데이트
            orderDetail.setReviewed(true);
            orderDetailRepository.save(orderDetail);

            // update goods set
            log.info("등록/수정된 리뷰 정보: memberId={}, goodsId={}, orderDetailId={}, score={}, title={}, content={}, imageFiles={}",
                    member.getId(), goods.getGoodsId(), orderDetail.getOrderDetailId(),
                    updateReview.getScore(), updateReview.getTitle(), updateReview.getContent(), updateReview.getImageFile());
            return ResponseEntity.status(HttpStatus.OK).body("리뷰가 정상적으로 등록되었습니다.");
        } catch (Exception e) {
            log.error("리뷰 등록 중 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
        }
    }

//
//    // 리뷰 작성 (25.07.24 정상동작)
//    @Override
//    @Transactional
//    public ResponseEntity<?> regReview(CustomUserDetails userDetails, //
//                                       ReviewUploadDTO reviewUploadDTO) throws IOException {
//        // 1. Entity 조회
//        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
//        Goods goods = goodsRepository.findById(reviewUploadDTO.getGoodsId()) //
//                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 상품입니다."));
//        OrderDetail orderDetail = orderDetailRepository.findById(reviewUploadDTO.getOrderDetailId())
//                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 주문상세입니다."));
//
//        // 2. 이미지 로직
//        List<MultipartFile> imageFiles = reviewUploadDTO.getImageFiles();
//
//        // 2-1. 파일 저장 경로
//        List<String> uploadedFileNames = new ArrayList<>();
//        String realPath = fileUploadProperties.getReviewPath();
//
//        // 2-2. 업로드 이미지 처리
//        if (imageFiles  != null && !imageFiles .isEmpty()) {
//            for(MultipartFile imageFile : imageFiles){
//                if(!imageFile.isEmpty()){
//                    String originalFilename = imageFile.getOriginalFilename(); // ex: cat.jpg
//                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
//                    String uuid = UUID.randomUUID().toString();
//                    String newFileName = uuid + extension; // UUID 추가
//                    File destFile = new File(realPath + newFileName);
//                    imageFile.transferTo(destFile); // MultipartFile 저장
//                    uploadedFileNames.add(newFileName); //
//                    log.info("업로드이미지 = "+newFileName);
//                }
//            }
//        }
//
//        // 3. DTO SET
//        // 3-1. 이미지 파일명 문자열로 저장
//        String uploadImg = String.join(",", uploadedFileNames);
//        reviewUploadDTO.setUploadImg(uploadImg);
//
//        // 3-2. 기타 정보 SET
//        reviewUploadDTO.setMemberId(member.getId());
//
//        // 4. 등록/수정 분기
//        Optional<Review> preReview = reviewRepository.findReviews(member.getId(), reviewUploadDTO.getOrderDetailId());
//        Review updateReview; // 수정된 리뷰 엔티티
//        double rating; // 상품 자체 별점
//        try {
//            // 최초 등록 vs 업데이트 분기
//            if(!preReview.isPresent()) { // 최초 등록인 경우
//                updateReview = reviewMapper.toEntity(reviewUploadDTO, member, goods, orderDetail);
//                updateReview.setRegDate(LocalDate.now());
//
//                // 등록 시 Goods 에도 review 추가함
//                goods.setReviewNum(goods.getReviewNum()+1); // 리뷰 + 1
//
//                // 별점 상품에 반영 (신규인 경우)
//                // score1, score2 둘다 같은 값 저장
//                updateReview.setScore(reviewUploadDTO.getScore());
//                updateReview.setScoreNew(reviewUploadDTO.getScore());
//                if(goods.getRating() == 0){
//                    rating = reviewUploadDTO.getScore();
//                }else{
//                    rating = (goods.getRating() + reviewUploadDTO.getScore())/2;
//                }
//                log.info("상품에 매겨질 별점: "+rating);
//
//                // 주문상세 : setReviewed
//                orderDetail.setReviewed(true);
//                log.info("orderDetail.setIsReviewed(true) 후: "+orderDetail.getReviewed());
//                orderDetailRepository.save(orderDetail);
//
//            }else{ // 리뷰 수정의 경우
//                updateReview = preReview.get(); // 기존 엔티티 복사
//                updateReview.setModDate(LocalDate.now());
//                // 별점 상품에 반영 (수정의 경우)
//                // score 2 -> score 1 복사
//                updateReview.setScore(updateReview.getScoreNew());
//                // score2에는 uploadDTO 의 정보 저장
//                updateReview.setScoreNew(reviewUploadDTO.getScore());
//                // goods의 별점 * 2 - score1
//                if(goods.getRating() == 0){
//                    rating = reviewUploadDTO.getScore();
//                }else{
//                    rating = (goods.getRating() * 2 - updateReview.getScore());
//                }
//                updateReview.setImageFile(uploadImg);
//                updateReview.setModDate(LocalDate.now());
//
//            }
//
//            // 4-3. 제목 / 내용 미입력한 경우 null 예외 방어
//            updateReview.setTitle(StringUtils.hasText(reviewUploadDTO.getTitle()) ? reviewUploadDTO.getTitle() : "");
//            updateReview.setContent(StringUtils.hasText(reviewUploadDTO.getContent()) ? reviewUploadDTO.getContent() : "");
//            log.info("등록할 리뷰 정보: memberId={}, goodsId={}, orderDetailId={}", member.getId(), updateReview.getGoods().getGoodsId(), updateReview.getOrderDetail().getOrderDetailId());
//            log.info("score={}, title={}, content={}, imageFiles={}", updateReview.getScore(), updateReview.getTitle(), updateReview.getContent(), updateReview.getImageFile());
//
//            goods.setRating(rating);
//            goodsRepository.save(goods);
//            reviewRepository.save(updateReview); // 저장
//
//            // 주문상세에도 상태 업데이트, orderDetailID 업데이트
//            orderDetail.setReviewed(true);
//            orderDetailRepository.save(orderDetail);
//
//            // update goods set
//            log.info("등록/수정된 리뷰 정보: memberId={}, goodsId={}, orderDetailId={}, score={}, title={}, content={}, imageFiles={}",
//                    member.getId(), goods.getGoodsId(), orderDetail.getOrderDetailId(),
//                    updateReview.getScore(), updateReview.getTitle(), updateReview.getContent(), updateReview.getImageFile());
//            return ResponseEntity.status(HttpStatus.OK).body("리뷰가 정상적으로 등록되었습니다.");
//        } catch (Exception e) {
//            log.error("리뷰 등록 중 오류: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
//        }
//    }

    // 리뷰 삭제
    @Override
    @Transactional
    public ResponseEntity<?> deleteReview(Long reviewId){
        try {
            Review review = reviewRepository.findById(reviewId).get();
            Goods goods = goodsRepository.findById(review.getGoods().getGoodsId()) //
                    .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 상품입니다."));
            goods.setReviewNum(goods.getReviewNum()-1); // 리뷰 + 1
            goodsRepository.save(goods);
            reviewRepository.deleteById(reviewId);
            return ResponseEntity.status(HttpStatus.OK).body("리뷰가 정상적으로 삭제되었습니다.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("리뷰 삭제에 실패하였습니다.");
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

        // 이미지 리스트 백엔드 경로 지정
        dtoList.forEach(dto -> {
            log.info("reviewId = "+dto.getReviewId());
            if (dto.getGoods() != null) {
                dto.getGoods().setImageFile(fileUploadProperties.getStaticUrl() + dto.getGoods().getImageFile());
            }

            if (dto.getImageFile() != null && !dto.getImageFile().isBlank()) {
                String[] paths = dto.getImageFile().split(",");
                for (int i = 0; i < paths.length; i++) {
                    paths[i] = fileUploadProperties.getReviewUrl() + paths[i].trim();
                }
                dto.setImageFile(String.join(",", paths));
            }
        });

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


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 품 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 리뷰 리스트 출력 (상품)
    @Override
    @jakarta.transaction.Transactional
    public ResponseEntity<?> goodsReviewList(Long goodsId, PageRequestDTO pageRequestDTO){
        log.info("** GoodsServiceImpl 실행됨 **");
        // 페이징
        // 1. 정렬 조건 설정 :  (최신)
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? // desc라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        // 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);
        log.info("** 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬 **");

        // 3. Page<Review> 의 content (DTO에 SET)
        Page<Review> reviewPage = reviewRepository.findAllByGoodsId(goodsId, pageable); // Review List

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


//
//    // 리뷰 수정 ( deprecated )
//    @Override
//    @Transactional
//    public ResponseEntity<?> updateReview(CustomUserDetails userDetails, //
//                                       ReviewUploadDTO reviewUploadDTO) throws IOException {
//        Member member = memberRepository.findById(userDetails.getMember().getId()).orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
//        List<MultipartFile> imageFiles = reviewUploadDTO.getImageFiles();
//
//        // 이미지 로직
//        // 1. 파일 저장 경로
//        List<String> uploadedFileNames = new ArrayList<>();
//        String realPath = "C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/";
//
//        // 2. 업로드 이미지 처리
//        if (imageFiles  != null && !imageFiles .isEmpty()) {
//            for(MultipartFile imageFile : imageFiles){
//                if(!imageFile.isEmpty()){
//                    String originalFilename = imageFile.getOriginalFilename(); // ex: cat.jpg
//                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
//                    String uuid = UUID.randomUUID().toString();
//                    String newFileName = uuid + extension; // UUID 추가
//                    File destFile = new File(realPath + newFileName);
//                    imageFile.transferTo(destFile); // MultipartFile 저장
//                    uploadedFileNames.add(newFileName); //
//                }
//            }
//        }
//
//        // 이미지 파일명 문자열로 저장
//        String uploadImg = String.join(",", uploadedFileNames);
//        reviewUploadDTO.setUploadImg(uploadImg);
//        reviewUploadDTO.setMemberId(member.getId());
//
//        Optional<Goods> goods = goodsRepository.findById(reviewUploadDTO.getGoodsId());
//        OrderDetail orderDetail = orderDetailRepository.findById(reviewUploadDTO.getOrderDetailId())
//                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 주문상세입니다."));
//
//        // 수정 로직의 경우 reviewUploadDTO 에 reviewId 포함됨
//        Review review = reviewMapper.toEntity(reviewUploadDTO, member, goods.get(), orderDetail);
//        reviewRepository.save(review);
//        orderDetail.setReviewed(true);
//        log.info("orderDetail.setIsReviewed(true) 후: "+orderDetail.getReviewed());
//        orderDetailRepository.save(orderDetail);
//
//        // null 방어 코드
//        review.setTitle(StringUtils.hasText(reviewUploadDTO.getTitle()) ? reviewUploadDTO.getTitle() : "");
//        review.setContent(StringUtils.hasText(reviewUploadDTO.getContent()) ? reviewUploadDTO.getContent() : "");
//
//        log.info("등록할 리뷰 정보: memberId={}, goodsId={}, orderDetailId={}", member.getId(), review.getGoods().getGoodsId(), review.getOrderDetail().getOrderDetailId());
//        log.info("score={}, title={}, content={}, imageFiles={}", review.getScore(), review.getTitle(), review.getContent(), review.getImageFile());
//
//        try{
//            reviewRepository.save(review);
//            log.info("** OrderServiceImpl => regReview() reviewRepository.save(review) 완료 **");
//            return ResponseEntity.status(HttpStatus.OK).body("리뷰가 정상적으로 등록되었습니다.");
//        } catch (Exception e) {
//            log.error("리뷰 등록 중 오류: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 중 오류가 발생했습니다.");
//        }
//    }



}
