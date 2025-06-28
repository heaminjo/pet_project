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
                .allowedOrigins("http://54.180.195.59:3000","http://54.180.195.59:8080","http://54.180.195.59")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(MAX_AGE_SECS);
        ;
    }

    // 파일 경로
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //멤버 이미지 경로 설정
        registry.addResourceHandler("/resources/webapp/userImages/**")
                .addResourceLocations("file:/home/ubuntu/pet_back/src/main/resources/webapp/userImages/");
//                .addResourceLocations("file:src/main/resources/webapp/userImages/");
    }

}
