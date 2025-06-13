package com.example.pet_back.service.goods;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.domain.admin.BannerDTO;
import com.example.pet_back.domain.admin.BannerInsertDTO;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.goods.*;
import com.example.pet_back.domain.page.PageRequestDTO;
import com.example.pet_back.domain.page.PageResponseDTO;
import com.example.pet_back.entity.*;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.mapper.GoodsMapper;
import com.example.pet_back.mapper.OrderMapper;
import com.example.pet_back.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService {

    // Reposiotory
    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final FavoriteRepository favoriteRepository;
    private final GoodsBannerRepository goodsBannerRepository;
    private final FileUploadProperties fileUploadProperties;
    private final CategoryRepository categoryRepository;

    // Mapper
    private final GoodsMapper goodsMapper;

    // 상품상세정보
    @Override
    public ResponseEntity<?> selectOne(Long goods_id) {
        log.info("** GoodsServiceImpl 실행됨 **");
        Goods goods = goodsRepository.findById(goods_id).get();
        return ResponseEntity.status(HttpStatus.OK).body(goods);
    }

    // 찜
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

    @Override
    public ResponseEntity<?> findMemberAddress(CustomUserDetails userDetails){
        return ResponseEntity.status(HttpStatus.OK).body("구현중");
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
        Page<Goods> page = goodsRepository.findAll(pageable); // GoodsList

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

    // 상품등록
    @Override
    public void registerGoods(GoodsRequestDTO goodsRequestDTO) throws IOException {
        log.info("** GoodsServiceImpl 실행됨 **");
        System.out.println("에러발생지점 확인용 : " + goodsRequestDTO.getGoodsState().getClass());

        Long categoryId = goodsRequestDTO.getCategoryId();
        String goodsName = goodsRequestDTO.getGoodsName();
        int price = goodsRequestDTO.getPrice();
        String description = goodsRequestDTO.getDescription();
        String goodsState = goodsRequestDTO.getGoodsState().name(); // String 변환 후 저장 필수

        String imageFile = goodsRequestDTO.getImageFile();  //apple.jpg
        int quantity = goodsRequestDTO.getQuantity();

        // 이미지 로직
        // 1. 파일 저장 경로
        String realPath = "C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/";

        // 2. 디렉터리 생성
        File path = new File(realPath); // 파일 또는 디렉토리를 참조하는 File 객체생성
        if (!path.exists()) path.mkdir(); // null인경우 경로 생성(최초1회)

        // 3. 이미지가 제대로 넘어오지 않는 CASE 위한 방어 코드 (기본이미지 복사 저장)
        if (!path.exists()) {
            String basicImg = "C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/basicimg.jpg";
            FileInputStream fin = new FileInputStream(new File(basicImg)); // 읽어오기 위한 스트림
            FileOutputStream fout = new FileOutputStream(path); // 쓰기 위한 스트림
            FileCopyUtils.copy(fin, fout); // Spring이 제공하는 유틸리티클래스 (파일복사)
        }

        // 4. 업로드 이미지 처리
        String uploadImg = "basicman.png";
        if ( imageFile!= null && !imageFile.isEmpty()) {
            File sourceFile = new File(realPath+imageFile); // 원본파일
            if(sourceFile.exists()){
                String extension = imageFile.substring(imageFile.lastIndexOf("."));
                String uuid = UUID.randomUUID().toString();
                String newFileName = uuid + extension;
                // 복사 대상
                File destFile = new File(realPath+newFileName);
                FileCopyUtils.copy(new FileInputStream(sourceFile), new FileOutputStream(destFile));
                // 복사된 새 파일명 DB에 저장
                uploadImg = newFileName;
            }
        }

        // 5. 이미지 파일명 DTO에 주입 (DB 저장용)
        goodsRequestDTO.setImageFile(uploadImg);

        goodsRepository.registerGoods(categoryId, goodsName, price, //
                description, goodsState, uploadImg, quantity);
    }

    // 상품수정 (미완)
    @Override
    public void updateGoods(CustomUserDetails userDetails, GoodsRequestDTO goodsRequestDTO){
        Goods goods = goodsRepository.findById(goodsRequestDTO.getGoodsId()).get();
        goodsRepository.deleteById(goods.getGoodsId());
    }

    // 상품삭제
    @Override
    public void deleteGoods(CustomUserDetails userDetails, GoodsRequestDTO goodsRequestDTO){
        Goods goods = goodsRepository.findById(goodsRequestDTO.getGoodsId()).get();
        goodsRepository.deleteById(goods.getGoodsId());
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

    @Override
    public ApiResponse bannerInsert(BannerInsertDTO dto) {
        Optional<Goods> goods = goodsRepository.findById(dto.getGoodsId());
        if(goods.isPresent()){
            Goodsbanner goodsbanner = goodsMapper.bannerToEntity(dto);
            goodsbanner.setGoods(goods.get());
            goodsBannerRepository.save(goodsbanner);
            return new ApiResponse(true,dto.getPosition()+"번째 배너에 '"+goodsbanner.getGoods().getGoodsName()+"'가 추가돼었습니다.");
        }else{
            return new ApiResponse(false,"존재하지 않는 배너입니다.");
        }

    }

}
