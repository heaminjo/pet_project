package com.example.pet_back.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

//이미지 처리
public interface ImageService {
    public ResponseEntity<?> memberUploadImage(Long id, MultipartFile file);
}
