import BoardInsertFormStyle from "./BoardInsertFormStyle";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BoardInsertForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("default"); // 기본값 설정
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]); // 기존 파일에 새로 선택한 파일 추가
  
    // 미리보기 (기존 미리보기 + 새로 미리보기 합치기)
    const previews = files.map( file => URL.createObjectURL(file) );
    setImagePreviews(prev => [...prev, ...previews]);
    e.target.value = ""; // 파일 선택 후 input 초기화
  };

  // 이미지 업로드 함수
  const handleImageUpload = async () => {
    if (!imageFiles || imageFiles.length === 0) return [];
    const formData = new FormData();
    imageFiles.forEach( file => formData.append("files", file) );
  
    try {
      const res = await axios.post("/board/uploadimage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // 서버에서 반환한 savedFileName
    } catch (error) {
      alert("이미지 업로드 실패");
      return null;
    }
  };

  
  useEffect(() => {
    const handleStorage = () => setRole(localStorage.getItem("role") || "");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //1. 이미지 먼저 업로드
    let savedFileNames = [];
    if (imageFiles && imageFiles.length > 0) {
      savedFileNames = await handleImageUpload();
      if (!savedFileNames || savedFileNames.length === 0) return;   //업로드 실패 시 중단
    }
    
    //2. 게시글 정보 + 이미지 파일명 전송
    let data = { title, content, category, imageFileNames: savedFileNames };
    let url = `/board/insertBoard/${category}`;

    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("게시글이 등록되었습니다.");
      console.log("category:", category, "url:", url);

      // 등록 후 해당 게시판 목록으로 이동  
      if(category==="notice") navigate(`/boardList/${category}`); 
      else if(category==="community") navigate(`/boardList/${category}`);
      else if(category==="faq") navigate(`/boardList/${category}`);
      else if(category==="free") navigate(`/boardList/${category}`);

    } catch (err) {
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const handleImageRemove = (idx) => {
    // 이미지 미리보기 삭제
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
    // 실제 파일 배열도 같이 삭제
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <BoardInsertFormStyle>
      <div className="boardInsertFormContainer">
        <h2>게시글 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="titleRow">
            <label htmlFor="title" className="titleLabel">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="titleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="categoryRow">
            <label htmlFor="category" className="categoryLabel">
              게시판
            </label>
            <br></br>
            <select
              id="category"
              name="category"
              className="categorySelect"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="default" disabled>게시판 선택</option>
              {role === "ROLE_ADMIN" && (
                <option value="notice">공지사항</option>
              )}
              <option value="community">커뮤니티</option>
              <option value="faq">Q&A</option>
              <option value="free">자유게시판</option>
              {/* 필요시 더 추가 */}
            </select>
          </div>
          <div className="contentRow">
            <label htmlFor="content" className="contentLabel">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              className="contentTextarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="imageRow">
            <div className="uploadBox">
              <label htmlFor="image" className="imageLabel">
                이미지 업로드
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none"}}
              />
              <span className="fileNameText">
                {imageFiles.length > 0
                  ? imageFiles.map(f => f.name).join(", ")
                  : "파일을 선택하세요."}
              </span>
            </div>
            {imagePreviews.length > 0 && (
              <div className="imagePreview">
                {imagePreviews.map((src, idx) => (
                  <div className="imagePreviewBox" key={idx}>
                    <img src={src} alt={`미리보기${idx}`} width={200} />
                    <button
                      type="button"
                      className="removeImageBtn"
                      onClick={() => handleImageRemove(idx)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="buttonRow">
            <button type="submit" className="submitBtn">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </BoardInsertFormStyle>
  );
}
