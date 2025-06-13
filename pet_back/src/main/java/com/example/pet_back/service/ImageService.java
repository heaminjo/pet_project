package com.example.pet_back.service;

import com.example.pet_back.domain.custom.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

//이미지 처리
public interface ImageService {
    public ResponseEntity<?> memberUploadImage(Long id, MultipartFile file);

    //배너 추가
    //배너 추가
    public ApiResponse bannerInsert(MultipartFile file, int position);

}
