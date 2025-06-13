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

        String image_file = goodsRequestDTO.getImageFile();  //apple.jpg
        int quantity = goodsRequestDTO.getQuantity();

        // 이미지 로직
        // 1. 파일 저장 경로 준비
        String realPath = "C:/devv/pet_project/pet_back/src/main/resources/webapp/goodsImages/";

        // 2. 기본 이미지 복사 처리
        File file = new File(realPath); // 파일 또는 디렉토리를 참조하는 File 객체생성
        if (!file.exists()) file.mkdir(); // null인경우 경로 생성(최초1회)
        file = new File(realPath + "basicman.png");
        if (!file.exists()) {
            String basicmanPath = "C:/devv/pet_project/pet_back/src/main/resources/webapp/goodsImages/basicman.png";
            FileInputStream fin = new FileInputStream(new File(basicmanPath));
            FileOutputStream fout = new FileOutputStream(file);
            FileCopyUtils.copy(fin, fout); // Spring이 제공하는 유틸리티클래스 (파일복사)
        }

        // 3. 업로드 이미지 처리
        String file1 = "", file2 = "basicman.png";
        // 컨트롤러에서 직접 받은 uploadImg 사용
        if (uploadImg != null && !uploadImg.isEmpty()) {
            String originalName = uploadImg.getOriginalFilename(); // 서버에 저장할 전체경로
            String extension = originalName.substring(originalName.lastIndexOf("."));
            String uuid = UUID.randomUUID().toString();
            String newFileName = uuid + extension;
            file1 = realPath + newFileName;
            uploadImg.transferTo(new File(file1)); // 전송 메서드(실제로 저장됨)

            file2 = newFileName; // DB 저장용 파일명
        }

        // 이미지 파일명 DTO에 주입 (DB 저장용)
        goodsRequestDTO.setImageFile(file2);

        goodsRepository.registerGoods(category_id, goods_name, price, //
                description, goods_state, file2, quantity);
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
