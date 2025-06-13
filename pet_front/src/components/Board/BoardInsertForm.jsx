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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  
    // 미리보기
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // 이미지 업로드 함수
  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("file", imageFile);
  
    try {
      const res = await axios.post("/api/uploadimage", formData, {
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
    let savedFileName = null;
    if (imageFile) {
      savedFileName = await handleImageUpload();
      if (!savedFileName) return;   //업로드 실패 시 중단
    }
    
    //2. 게시글 정보 + 이미지 파일명 전송
    let data = { title, content, category, imageFileNames: savedFileName ? [savedFileName] : [] };
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
            <label htmlFor="image" className="imageLabel">
              이미지 첨부
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="imagePreview">
                <img src={imagePreview} alt="미리보기" width={200} />
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
