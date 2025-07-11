package com.example.pet_back.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
//application.properties에 있는 값들을 자바 클래스 필드에 자동으로 바인딩
@ConfigurationProperties(prefix = "file.upload")
public class FileUploadProperties {

    private String userPath; // (멤버) 업로드 경로
    private String userUrl; // (멤버) 업로드 이미지 URL

    private String reviewPath; // (리뷰) 업로드 경로
    private String reviewUrl; // (리뷰) 업로드 이미지 URL

    private String boardPath; // (게시물) 업로드 경로
    private String boardUrl; // (게시물) 업로드 이미지 URL

    private String staticPath; // 정적 이미지 업로드 경로
    private String staticUrl;  // 정적 이미지 URL

}
