package com.example.pet_back.controller;

import com.example.pet_back.domain.kakao.KakaoUserResponseDTO;
import com.example.pet_back.domain.login.SocialUpdateDTO;
import com.example.pet_back.jwt.CustomUserDetails;
import com.example.pet_back.service.KakaoService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
@Log4j2
public class KakaoLoginController {

    private final KakaoService kakaoService;
    //카카오

    //REST Key
    @Value("${kakao.client-id}")
    private String client_id;
    //리다이렉트 url : 로그인 성공 시 url
    @Value("${kakao.redirect-uri}")
    private String redirect_uri;

    //카카오 로그인 성공 시 여기로 오게된다.
    @GetMapping("/login")
    public ResponseEntity<?> kakaoLogin(@RequestParam("code") String code, HttpServletResponse response) {
        log.info("카카오 로그인 컨트롤러 진입 => code" + code);
        String token = kakaoService.getAccessToken(code);
        KakaoUserResponseDTO userInfo = kakaoService.getUserInfo(token);
        return ResponseEntity.ok(kakaoService.LoginAndJoin(userInfo, response));
    }

    //소셜 로그인 필수정보 저장
    @PutMapping("/social/update")
    public ResponseEntity<?> socialUpdate(@AuthenticationPrincipal CustomUserDetails details, @RequestBody SocialUpdateDTO dto) {
        log.info("address=>" + dto.getAddress1());
        return kakaoService.socialUpdate(details.getMember().getId(), dto);
    }
}
