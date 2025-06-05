package com.example.pet_back.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
//application.properties에 있는 값들을 자바 클래스 필드에 자동으로 바인딩
@ConfigurationProperties(prefix = "file.upload")
public class FileUploadProperties {

    private String path;
    private String url;
}
