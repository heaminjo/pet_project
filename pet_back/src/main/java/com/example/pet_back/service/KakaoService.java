package com.example.pet_back.service;

import com.example.pet_back.constant.ADDRTYPE;
import com.example.pet_back.constant.MEMBERSTATE;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.domain.kakao.KakaoTokenResponseDTO;
import com.example.pet_back.domain.kakao.KakaoUserResponseDTO;
import com.example.pet_back.domain.login.SocialUpdateDTO;
import com.example.pet_back.domain.login.TokenDTO;
import com.example.pet_back.entity.Address;
import com.example.pet_back.entity.Member;
import com.example.pet_back.entity.RefreshToken;
import com.example.pet_back.jwt.TokenProvider;
import com.example.pet_back.repository.AddressRepository;
import com.example.pet_back.repository.MemberRepository;
import com.example.pet_back.repository.RefreshTokenRepository;
import io.netty.handler.codec.http.HttpHeaderValues;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Log4j2
public class KakaoService {
    //카카오 서버와 통신할때 필요한 REST API 키
    private String clientId;
    private String redirectUri;
    //인가 코드 (토큰으로 교환하는 API의 도메인)
    private final String TOKEN_URL_HOST;
    //사용자 정보를 가져오는 API의 도메인
    private final String USER_URL_HOST;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AddressRepository addressRepository;

    //초기화
    @Autowired
    public KakaoService(@Value("${kakao.client-id}") String clientId, @Value("${kakao.redirect-uri}") String redirectUri, @Value("${kakao.token-host}") String tokenHost, @Value("${kakao.user-host}") String userHost, MemberRepository memberRepository, TokenProvider tokenProvider, RefreshTokenRepository refreshTokenRepository, AddressRepository addressRepository) {
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.TOKEN_URL_HOST = tokenHost;
        this.USER_URL_HOST = userHost;
        this.memberRepository = memberRepository;
        this.tokenProvider = tokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.addressRepository = addressRepository;

    }

    //access토큰 받아오기
    public String getAccessToken(String code) {
        log.info("토큰을 생성합니다. code => " + code);
        KakaoTokenResponseDTO kakaoTokenResponseDTO = WebClient.create(TOKEN_URL_HOST).post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .path("/oauth/token")
                        .queryParam("grant_type", "authorization_code") //카카오에서 AccessTOken 요청시 반드시 authorization_code 으로
                        .queryParam("client_id", clientId)
                        .queryParam("redirect_uri", redirectUri)
                        .queryParam("code", code)
                        .build(true))
                .header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new RuntimeException("Invalid Parameter")))
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> Mono.error(new RuntimeException("Internal Server Error")))
                .bodyToMono(KakaoTokenResponseDTO.class)//DTO에 받아온 JSON형태의 토큰을 매핑 시켜준다.
                .block(); //비동기 호출 결과를 동기적으로 대기한다.
        log.info(" [Kakao Service] Access Token ------> {}", kakaoTokenResponseDTO.getAccessToken());
        log.info(" [Kakao Service] Refresh Token ------> {}", kakaoTokenResponseDTO.getRefreshToken());


        return kakaoTokenResponseDTO.getAccessToken();
    }

    //유저 정보 가져오기
    public KakaoUserResponseDTO getUserInfo(String token) {
        log.info("유저의 정보를 가져옵니다. token=>" + token);
        //유저의 정보를 가져오기 위한 USER URL HOST
        KakaoUserResponseDTO userInfo = WebClient.create(USER_URL_HOST)
                .get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .path("/v2/user/me")
                        .build(true)
                ).header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new RuntimeException("Invalid Parameter")))
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> Mono.error(new RuntimeException("Interval Server Error")))
                .bodyToMono(KakaoUserResponseDTO.class)
                .block();

        return userInfo;
    }

    public ApiResponse<?> LoginAndJoin(KakaoUserResponseDTO dto, HttpServletResponse response) {
        log.info("카카오 계정을 조회합니다.");
        //카카오 아이디로 조회
        try {
            Optional<Member> member = memberRepository.findByKakaoId(dto.getId());
            Authentication authentication = null;
            //만약 있다면 로그인 처리하고 없다면 회원가입 한다.
            if (member.isEmpty()) {
                log.info("카카오 계정이 없습니다. 회원가입 진행");
                //회원 가입
                Member newMember = new Member(dto.getId(), dto.getKakaoAccount().getProfile().getNickName(), dto.getKakaoAccount().getProfile().getProfileImageUrl());
                newMember.setMemberState(MEMBERSTATE.INCOMPLETE); //임시회원으로 저장
                Member user = memberRepository.save(newMember);
                log.info("회원 가입 성공 회원의 상태 => " + user.getMemberState());

                //인증 객체 생성
                authentication = tokenProvider.getAuthentication(user.getId());
            } else {
                log.info("카카오 계정이 존재합니다. 로그인 처리합니다.");//존재하는 경우 이메일 true
                authentication = tokenProvider.getAuthentication(member.get().getId());
            }

            TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);//이메일의 존재 여부를 넣어준다.
            log.info("토큰 발급 => " + tokenDTO);


            //RefreshToken DB 저장하기
            RefreshToken refreshToken = RefreshToken.builder()
                    .userId(tokenProvider.getUserId(tokenDTO.getAccessToken()))
                    .token(tokenDTO.getRefreshToken())
                    .expiration(tokenDTO.getAccessTokenExpiresln())
                    .build();

            response.setHeader("Set-Cookie",
                    "refreshToken=" + tokenDTO.getRefreshToken() +
                            "; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax");

            refreshTokenRepository.save((refreshToken));
            //커스텀 응답 객체에 token을 담아 반환
            return new ApiResponse<TokenDTO>(true, tokenDTO, "로그인에 성공하였습니다.");
        } catch (Exception e) {
            log.info("로그인 중 에러 발생 =>" + e.getMessage());
            return new ApiResponse<>(false, "잘못된 아이디 또는 비밀번호를 입력하셨습니다.");
        }
    }

    //소셜 로그인 추가 정보 업데이트
    @Transactional
    public ResponseEntity<?> socialUpdate(Long id, SocialUpdateDTO dto) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        //멤버 업데이트 저장
        member.setGender(dto.getGender());
        member.setEmail(dto.getEmail());
        member.setBirth(dto.getBirth());
        member.setPhone(dto.getPhone());
        member.setMemberState(MEMBERSTATE.ACTIVE);
        Member member1 = memberRepository.save(member);
        log.info(dto.getAddress1());
        addressRepository.save(new Address(member1, dto.getAddress1(), dto.getAddress2(), dto.getAddressZip(), ADDRTYPE.DEFAULT, "집"));

        return ResponseEntity.ok(new ApiResponse<>(true, "필수 정보 업데이트 완료"));
    }
}
