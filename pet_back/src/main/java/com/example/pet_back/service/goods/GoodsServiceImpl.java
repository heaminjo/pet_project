package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.constant.GOODSSTATE;
import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.admin.BestDTO;
import com.example.pet_back.domain.admin.BestInsertDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.GoodsMapper;
import com.example.pet_back.mapper.ReviewMapper;
import com.example.pet_back.repository.*;
import jakarta.transaction.Transactional;
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
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService {

    // Reposiotory
    private final GoodsRepository goodsRepository;
    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final FavoriteRepository favoriteRepository;
    private final GoodsBannerRepository goodsBannerRepository;
    private final GoodsBestRepository goodsBestRepository;
    private final FileUploadProperties fileUploadProperties;
    private final CategoryRepository categoryRepository;

    // Mapper
    private final GoodsMapper goodsMapper;
    private final ReviewMapper reviewMapper;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 품 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 상품상세정보
    @Override
    public ResponseEntity<?> selectOne(Long goodsId) {
        log.info("** GoodsServiceImpl 실행됨 **");
        Goods goods = goodsRepository.findById(goodsId).get();

        //이미지 파일 수정 (조해민)
        goods.setImageFile(fileUploadProperties.getUrl()+goods.getImageFile());
        return ResponseEntity.status(HttpStatus.OK).body(goods);
    }

    // 상품리스트 출력
    @Override
    public ResponseEntity<?> showGoodsList(PageRequestDTO pageRequestDTO) {
        log.info("** GoodsServiceImpl 실행됨 **");

        // 페이징
        // 1. 정렬 (최신)
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? // desc라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        // 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);

        // 3. Page<Goods> 조회 완료
        Page<Goods> page;
        // 키워드 유무에 따른 분기
        // 빈 문자열일 경우
        String keyword = pageRequestDTO.getKeyword();
        String category = pageRequestDTO.getType();
        if ("all".equals(category)) category = "";
        if ("all".equals(keyword)) keyword = "";

        if(keyword.isEmpty() && category.isEmpty()){ // 키워드 & 카테고리 X
            // 전체 조회
            log.info("전체 조회 => Category / Keyword : All");
            page = goodsRepository.findAll(pageable); // GoodsList
        }else if(pageRequestDTO.getType().isEmpty()) { // 카테고리 X
            // Type: all 전체 조회
            log.info("전체 조회 => Category : All / Keyword : ??" );
            page = goodsRepository.findByKeyword("%" + pageRequestDTO.getKeyword() + "%", pageable);
        }else if(pageRequestDTO.getKeyword().isEmpty()) { // 키워드 X
            log.info("전체 조회 => Category : ?? / Keyword : All" );
            page = goodsRepository.findByCategory(pageRequestDTO.getCategory(), pageable);
        }else { // 검색필터
            // 검색 필터 : 키워드 & 카테고리
            log.info("필터링 => Category : ??  keyword : ??");
            page = goodsRepository.findByCategoryAndKeyword("%" + pageRequestDTO.getKeyword() + "%", pageRequestDTO.getCategory(), pageable);
        }
        log.info("** 키워드 유무에 따른 분기 **");
        // 4. 스트림 사용하여 GoodsResponseDTO 리스트로 변환
        List<GoodsResponseDTO> goodsResponseDTOList = page.getContent().stream() //
                .map(goods -> GoodsResponseDTO.builder() //
                        .goodsId(goods.getGoodsId())
                        .goodsName(goods.getGoodsName())
                        .price(goods.getPrice())
                        .description(goods.getDescription())
                        .goodsState(goods.getGoodsState())
                        .imageFile(goods.getImageFile())
                        .rating(goods.getRating())
                        .views(goods.getViews())
                        .reviewNum(goods.getReviewNum())
                        .quantity(goods.getQuantity())
                        .regDate(goods.getRegDate())
                        .build()).collect(Collectors.toList());

        log.info("** 스트림 사용하여 GoodsResponseDTO 리스트로 변환 **");
        // 5. 반환할 ResponseDTO 에 List 저장 (goodsResponseDTOList)
        PageResponseDTO<GoodsResponseDTO> response = new PageResponseDTO<>( //
                goodsResponseDTOList, //
                pageRequestDTO.getPage(), pageRequestDTO.getSize(),  //
                page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious());

        log.info("** 반환할 ResponseDTO 에 List 저장 (goodsResponseDTOList) **");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    // 상품등록
    @Override
    public void registerGoods(GoodsUploadDTO goodsUploadDTO) throws IOException {
        log.info("** GoodsServiceImpl 실행됨 **");
        System.out.println("에러발생지점 확인용 : " + goodsUploadDTO.getGoodsState().getClass());

        Long categoryId = goodsUploadDTO.getCategoryId();
        String goodsName = goodsUploadDTO.getGoodsName();
        int price = goodsUploadDTO.getPrice();
        String description = goodsUploadDTO.getDescription();

        String goodsState = goodsUploadDTO.getGoodsState() != null ? goodsUploadDTO.getGoodsState().name() : GOODSSTATE.SALE.name();

        int quantity = goodsUploadDTO.getQuantity();

        MultipartFile imageFile = goodsUploadDTO.getImageFile();
        String uploadImg = "basicimg.jpg"; // 기본이미지
        LocalDate regDate = goodsUploadDTO.getRegDate();
        if (regDate == null) {
            regDate = LocalDate.now(); // 오늘 날짜로 자동 설정
        }

        // 이미지 로직
        // 1. 파일 저장 경로
        String realPath = "C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/";

        // 2. 디렉터리 생성
        File path = new File(realPath); // 파일 또는 디렉토리를 참조하는 File 객체생성
        if (!path.exists()) path.mkdirs(); // null인경우 경로 생성(최초1회)

        // 3. 이미지가 제대로 넘어오지 않는 CASE 위한 방어 코드 (기본이미지 복사 저장)
        File defaultImg = new File(realPath + "basicimg.jpg");
        if (!defaultImg.exists()) {
            String basicImg = "C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/basicimg.jpg";
            FileInputStream fin = new FileInputStream(new File(basicImg)); // 읽어오기 위한 스트림
            FileOutputStream fout = new FileOutputStream(path); // 쓰기 위한 스트림
            FileCopyUtils.copy(fin, fout); // Spring이 제공하는 유틸리티클래스 (파일복사)
        }

        // 4. 업로드 이미지 처리
        if (imageFile != null && !imageFile.isEmpty()) {
            String originalFilename = imageFile.getOriginalFilename(); // ex: cat.jpg
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uuid = UUID.randomUUID().toString();
            String newFileName = uuid + extension;

            File destFile = new File(realPath + newFileName);
            imageFile.transferTo(destFile); // MultipartFile 저장

            uploadImg = newFileName;
        }

        // 5. 이미지 파일명 DTO에 주입 (DB 저장용)
        goodsRepository.registerGoods(categoryId, goodsName, price, //
                description, goodsState, uploadImg, quantity, regDate);
    }

    // 상품수정
    @Override
    public void updateGoods(GoodsUploadDTO goodsUploadDTO) {
        Goods goods = goodsRepository.findById(goodsUploadDTO.getGoodsId()).get();

        log.info("** GoodsServiceImpl updateGoods 실행됨 **");
        System.out.println("에러발생지점 확인용 : " + goodsUploadDTO.getGoodsState().getClass());

        Long categoryId = goodsUploadDTO.getCategoryId();
        String goodsName = goodsUploadDTO.getGoodsName();
        int price = goodsUploadDTO.getPrice();
        String description = goodsUploadDTO.getDescription();

        String goodsState = goodsUploadDTO.getGoodsState() != null ? goodsUploadDTO.getGoodsState().name() : GOODSSTATE.SALE.name();

        int quantity = goodsUploadDTO.getQuantity();

        MultipartFile imageFile = goodsUploadDTO.getImageFile();
        String uploadImg = "basicimg.jpg"; // 기본이미지


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
            try {
            imageFile.transferTo(destFile); // MultipartFile 저장
            } catch (IOException e) {
                log.error("이미지 저장 중 오류 발생", e);
                throw new RuntimeException("파일 저장 실패", e); // 혹은 커스텀 예외
            }
            uploadImg = newFileName;
        }

        // 5. 이미지 파일명 DTO에 주입 (DB 저장용)
        goodsRepository.updateGoods(goods.getGoodsId(), categoryId, goodsName, price, //
                description, goodsState, uploadImg, quantity);

    }

    // 상품삭제
    @Override
    public void deleteGoods(GoodsRequestDTO goodsRequestDTO){
        Goods goods = goodsRepository.findById(goodsRequestDTO.getGoodsId()).get();
        goodsRepository.deleteById(goods.getGoodsId());
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 찜 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 찜 (추가/해제 - 단일)
    @Override
    @Transactional
    public ResponseEntity<?> favorite(Long goodsId, CustomUserDetails userDetails) {
        log.info("** GoodsServiceImpl 실행됨 **");
        Member member = memberRepository.findById(userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
       boolean exists = favoriteRepository.existsByMemberIdAndGoodsId(member.getId(), goodsId);

        if (exists) {
            favoriteRepository.deleteByMemberIdAndGoodsId(member.getId(), goodsId);
            return ResponseEntity.ok("FALSE");
        } else {
            Favorite favorite = new Favorite();
            favorite.setMemberId(member.getId());
            favorite.setGoodsId(goodsId);
            favoriteRepository.save(favorite);
            return ResponseEntity.ok("TRUE");
        }
    }

    // 찜 (가져오기 - 단일)
    @Override
    @Transactional
    public ResponseEntity<?> favoriteInfo(Long goodsId, CustomUserDetails userDetails){
        log.info("** GoodsServiceImpl 실행됨 **");
        Member member = memberRepository.findById(userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        boolean exists = favoriteRepository.existsByMemberIdAndGoodsId(member.getId(), goodsId);

        if(exists){
            return ResponseEntity.ok("TRUE");
        }else{
            return ResponseEntity.ok("FALSE");
        }

    }

    // 찜 목록
    @Override
    public ResponseEntity<?> favorite(CustomUserDetails userDetails, PageRequestDTO pageRequestDTO){
        log.info("** GoodsServiceImpl 실행됨 **");
        Member member = memberRepository.findById(userDetails.getMember().getId()) //
                .orElseThrow(() //
                        -> new UsernameNotFoundException("존재하지 않는 회원입니다."));

        // 페이징
        // 1. 정렬 (최신)
        Sort sort = pageRequestDTO.getSortBy().equals("desc") ? // desc라면
                Sort.by("regDate").descending() // regDate 필드 기준으로 desc
                : Sort.by("regDate").ascending();

        // 2. Pageable 객체: 요청페이지 & 출력 라인 수 & 정렬
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);

        // 3. Page<Goods> 조회 완료 (Favorite 의 GoodsId로 Goods 정보 조회)
        Page<Goods> page = goodsRepository.findFavoriteList(member.getId(), pageable);

        // 4. 스트림 사용하여 GoodsResponseDTO 리스트로 변환
        List<GoodsResponseDTO> goodsResponseDTOList = page.getContent().stream() //
                .map(goods -> GoodsResponseDTO.builder() //
                        .goodsId(goods.getGoodsId())
                        .goodsName(goods.getGoodsName())
                        .price(goods.getPrice())
                        .description(goods.getDescription())
                        .goodsState(goods.getGoodsState())
                        .imageFile(goods.getImageFile())
                        .rating(goods.getRating())
                        .views(goods.getViews())
                        .reviewNum(goods.getReviewNum())
                        .quantity(goods.getQuantity())
                        .regDate(goods.getRegDate())
                        .build()).collect(Collectors.toList());

        // 5. 반환할 ResponseDTO 에 List 저장 (goodsResponseDTOList)
        PageResponseDTO<GoodsResponseDTO> response = new PageResponseDTO<>( //
                goodsResponseDTOList, //
                pageRequestDTO.getPage(), pageRequestDTO.getSize(),  //
                page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리 뷰 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 리뷰 리스트 출력 (상품)
    @Override
    @Transactional
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


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결 제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 고객의 배송지 정보
    @Override
    public ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails){
        return ResponseEntity.status(HttpStatus.OK).body("구현중");
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 배 너 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //배너 목록 가져오기
    @Override
    public List<BannerDTO> bannerList() {
        List<Goodsbanner> bannerList = goodsBannerRepository.bannerListAll();
        List<BannerDTO> response = new ArrayList<>();

        //수동으로 매핑
        for(Goodsbanner g : bannerList){
            String imagePath = fileUploadProperties.getUrl()+g.getImageFile();

            response.add(new BannerDTO(g.getBannerId(),imagePath,g.getPosition()));
        }
        return response;
    }

    //카테고리 목록
    @Override
    public List<CategoryResponseDTO> categoryList() {
        List<CategoryResponseDTO> categoryList = categoryRepository.categoryList();
//        List<CategoryResponseDTO> response = categoryList.stream().map(goodsMapper::categoryToDto).toList();
        return categoryList;
    }

    //상품 페이징 목록(조해민)
    @Override
    public PageResponseDTO<GoodsSimpleDTO> goodsPageList(PageRequestDTO dto) {
        //요청 페이지, 출력 개수,정렬을 담은 Pageable 객체
        Pageable pageable = PageRequest.of(dto.getPage(), dto.getSize());

        String keyword = dto.getKeyword() != null && !dto.getKeyword().isEmpty()
                ? "%" + dto.getKeyword() + "%" : null;
        Long category = dto.getCategory() != null && dto.getCategory() > 0
                ? dto.getCategory() : null;
        GOODSSTATE state = dto.getState() != null && !dto.getState().equals("all")
                ? GOODSSTATE.valueOf(dto.getState().toUpperCase()) : null;


        Page<Goods> page = goodsRepository.findSearchList(keyword, category, state, pageable);

        //페이지의 데이터를 List에 저장
        List<GoodsSimpleDTO> responseList = page.stream().map(goodsMapper::goodsToDto).toList();

        //반환할 ResponseDTO에 데이터들 저장
        PageResponseDTO<GoodsSimpleDTO> response = new PageResponseDTO<>(responseList, dto.getPage(), dto.getSize(), page.getTotalElements(), page.getTotalPages(), page.hasNext(), page.hasPrevious()
        );
        return response;
    }
    
    //베스트 상품 출력
    @Override
    public List<BestDTO> bestList() {
        List<GoodsBest> list = goodsBestRepository.bestListAll();
        
        List<BestDTO> response = new ArrayList<>();
        //수동으로 매핑
        for(GoodsBest g : list){
            String imagePath = fileUploadProperties.getUrl()+g.getGoods().getImageFile();
            response.add(new BestDTO(   g.getBestId(),
                                        g.getGoods().getGoodsId(),
                                        g.getGoods().getGoodsName(),
                                        g.getGoods().getRating(),
                                        g.getGoods().getReviewNum(),
                                        g.getGoods().getDescription(),
                                        imagePath,
                                        g.getPosition()));
        }
        return response;
    }

    //베스트 상품 추가
    @Override
    public ApiResponse bestInsert(BestInsertDTO dto) {
        log.info("추가할 상품 => "+dto.getGoodsId());
        Goods goods = goodsRepository.findById(dto.getGoodsId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        GoodsBest goodsBest = new GoodsBest();
        goodsBest.setGoods(goods);
        goodsBest.setPosition(dto.getPosition());
        goodsBestRepository.save(goodsBest);
        return new ApiResponse(true,dto.getPosition()+"번째 자리에 베스트 상품이 추가돼었습니다.");
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 카 테 고 리 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //카테고리 추가
    @Override
    public ApiResponse categoryInsert(String categoryName) {
        //카테고리가 10개 인지 아닌지 체크
        if(categoryRepository.count() >= 10){
            return new ApiResponse(false,"카테고리는 최대 10개입니다.");
        }else if(categoryRepository.existsByCategoryName(categoryName)){
            return new ApiResponse(false, categoryName+"와 중복되는 카테고리가 있습니다. 다른 이름을 입력해주세요.");
        }
        else {
            Category category = new Category();
            category.setCategoryName(categoryName);

            categoryRepository.save(category);
            return new ApiResponse(true,"카테고리 ["+categoryName+"] 가 추가 돼었습니다.");
        }

    }
    
    //카테고리 삭제
    @Override
    public ApiResponse categoryDelete(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));

        //만약 카테고리에 상품이 존재한다면
        if(goodsRepository.existsByCategory(category)){
            return new ApiResponse(false,"카테고리에 상품이 존재해 삭제가 불가능합니다.");
        }else{
            categoryRepository.deleteById(id);
            return new ApiResponse(true,"카테고리 [" + category.getCategoryName()+"] 가 삭제되었습니다.");
        }
    }
    
    //카테고리 수정
    @Override
    @Transactional
    public ApiResponse categoryUpdate(Long id, String categoryName) {
        Category category = categoryRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        //기존 이름 받아 두기
        String prevName = category.getCategoryName();
        //새 이름 저장
        category.setCategoryName(categoryName);
        return new ApiResponse(true,prevName + "에서 "+categoryName+"으로 이름 변경을 성공하였습니다.");
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 재 고 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //재고수량 수정
    @Override
    @Transactional
    public ApiResponse quantityUpdate(Long id, int quantity) {
        Goods goods = goodsRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        //수정 전 수량 저장
        int prev = goods.getQuantity();
        goods.setQuantity(quantity);

        String message = "상품 ["+goods.getGoodsName()+"] 의 수량이 "+prev+" -> "+quantity+" 으로 변경 완료되었습니다.";
        return new ApiResponse(true,message);
    }
    
    //상품 상태 수정
    @Override
    @Transactional
    public ApiResponse goodsStateUpdate(Long id, String state) {
        Goods goods = goodsRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Map<String,GOODSSTATE > map = Map.of(
          "판매",GOODSSTATE.SALE,
          "품절",GOODSSTATE.SOLDOUT,
          "숨김",GOODSSTATE.HIDDEN
        );
        goods.setGoodsState(map.get(state));
        return new ApiResponse(true,"상품 상태가 ["+state+"] 로 변경되었습니다");
    }
}
