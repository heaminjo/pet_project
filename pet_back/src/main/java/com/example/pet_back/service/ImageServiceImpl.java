package com.example.pet_back.service;

import com.example.pet_back.config.FileUploadProperties;
import com.example.pet_back.domain.custom.ApiResponse;
import com.example.pet_back.entity.Member;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ImageServiceImpl implements ImageService {
    private final MemberRepository memberRepository;
    private final FileUploadProperties fileUploadProperties;

    //물리적 저장 위치 경로
    public String getRealPath() {
        //반환
        // C:/devv/pet_project/pet_back/src/main/resources/webapp/userImages/
        String realPath = "C:"
                + File.separator + "devv"
                + File.separator + "pet_project"
                + File.separator + "pet_back"
                + File.separator + "src"
                + File.separator + "main"
                + File.separator + "resources"
                + File.separator + "webapp"
                + File.separator + "userImages"
                + File.separator;

        return realPath;
    }

    //이미지 변경
    @Override
    public ResponseEntity<?> memberUploadImage(Long id, MultipartFile file) {
        //비어있는지 확인
        if (file.isEmpty()) return null;

        //값 제대로 받아왔는지 체크
        String originalName = file.getOriginalFilename(); //apple.png
        String extension = originalName.substring(originalName.lastIndexOf("."));// .png
        String uuid = UUID.randomUUID().toString(); //고유한 식별자를 랜덤으로 생성
        String saveFileName = uuid + extension; //고유식별자.png

        String savePath = getRealPath();
        savePath += saveFileName;

        log.info("저장 경로 => " + savePath);

        try {
            File saveDir = new File(savePath); //저장할 디렉토리 생성
            //만얃 없다면 디렉토리를 생성한다.
            if (!saveDir.exists()) {
                saveDir.mkdir();
            }

            //실제 파일 저장 (multipart파일을 File 객체로 복사)
            file.transferTo(new File(savePath));

            //DB에 저장
            Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            member.setImageFile(saveFileName);
            memberRepository.save(member);

        } catch (IOException e) {
            return ResponseEntity.ok(new ApiResponse<String>(false, "이미지 변경을 실패하였습니다."));
        }
        String imageURL = fileUploadProperties.getUrl() + saveFileName;
        return ResponseEntity.ok(new ApiResponse<String>(true, imageURL, "이미지 변경이 완료되었습니다."));

    }
}
