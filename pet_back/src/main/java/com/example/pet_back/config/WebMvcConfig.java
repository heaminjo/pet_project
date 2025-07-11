package com.example.pet_back.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebMvcConfig implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    @Autowired
    private FileUploadProperties fileUploadProperties;

    //s
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
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

    // 파일 경로 : 정적 리소스URL -> 실제 경로 매핑
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String userPath = fileUploadProperties.getUserPath();  // /home/ubuntu/pet_back/uploads/userImages/
        String reviewPath = fileUploadProperties.getReviewPath();  // /home/ubuntu/pet_back/uploads/userImages/
        String boardPath = fileUploadProperties.getBoardPath();  // /home/ubuntu/pet_back/uploads/userImages/
        String staticPath = fileUploadProperties.getStaticPath();  // /home/ubuntu/pet_back/uploads/userImages/

        //멤버 이미지 경로 설정
        // registry.addResourceHandler("/resources/webapp/userImages/**")
        registry.addResourceHandler("/userImages/**")
                // .addResourceLocations("file:src/main/resources/webapp/userImages/"); // 개발용
                .addResourceLocations("file:" + userPath ); // 배포용
        //리뷰 이미지 경로
        registry.addResourceHandler("/reviewImages/**")
                // .addResourceLocations("file:src/main/resources/webapp/goodsImages/"); // 개발용
                .addResourceLocations("file:" + reviewPath); // 배포용
        //게시글 이미지 경로
        registry.addResourceHandler("/boardImages/**")
                // .addResourceLocations("file:src/main/resources/webapp/boardImages/"); // 개발용
                .addResourceLocations("file:" + boardPath); // 배포용
        //정적 이미지 소스 경로
        registry.addResourceHandler("/images/**")
                // .addResourceLocations("file:src/main/resources/webapp/boardImages/"); // 개발용
                .addResourceLocations("file:" + staticPath); // 배포용

    }
}
