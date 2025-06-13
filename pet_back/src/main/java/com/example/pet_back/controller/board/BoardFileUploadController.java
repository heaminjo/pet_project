package com.example.pet_back.controller.board;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class BoardFileUploadController {

    @PostMapping("/uploadimage")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {

        //1. 저장 경로 지정
        String uploadDir = "C:/uploads/";

        //2. 파일명 중복 방지 (UUID 등으로 랜덤 이름)
        String originalFileName = file.getOriginalFilename();
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        String savedFileName = UUID.randomUUID() + extension;
        File dest = new File(uploadDir + savedFileName);

        //3. 폴더 없으면 생성
        dest.getParentFile().mkdirs();

        try {
            //4. 파일 저장
            file.transferTo(dest);

            //5. 저장된 파일명 반환 (DB에는 savedFileName만 저장)
            return ResponseEntity.ok(savedFileName);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("파일 업로드 실패");
        }

    }

} //class
