package com.example.pet_back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebMvcConfig implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    //s
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                // .allowedOrigins("http://localhost:3000") // 개발용
                .allowedOrigins(
                        "http://13.209.222.217:3000",
                        "http://13.209.222.217:8080",
                        "http://13.209.222.217",
                        "http://localhost:3000",
                        "http://localhost:8080"
                        ) // 배포용
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization") // 프론트에서 응답헤더 읽을 수 있게 (배포용)
                .allowCredentials(true)
                .maxAge(MAX_AGE_SECS);
        ;
    }

    // 파일 경로
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //멤버 이미지 경로 설정
        registry.addResourceHandler("/resources/webapp/userImages/**")
                .addResourceLocations("file:src/main/resources/webapp/userImages/");
        //상품 이미지 경로
        registry.addResourceHandler("/resources/webapp/goodsImages/**")
                .addResourceLocations("file:src/main/resources/webapp/goodsImages/");
        //게시글 이미지 경로
        registry.addResourceHandler("/resources/webapp/boardImages/**")
                .addResourceLocations("file:src/main/resources/webapp/boardImages/");
    }
}
