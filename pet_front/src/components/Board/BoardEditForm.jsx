import React, { useEffect, useState } from "react";
import BoardInsertFormStyle from "./BoardInsertFormStyle";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function BoardEditForm() {
  const { category, board_id } = useParams(); // URL에서 게시글 id 추출
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const location = useLocation();
  // 카테고리 기본값 설정
  const navigate = useNavigate();
  const [existingImages, setExistingImages] = useState([]); // 기존 이미지 파일명 배열
  const [deletedImages, setDeletedImages] = useState([]);   // 삭제할 기존 이미지 파일명 배열
  const [newImageFiles, setNewImageFiles] = useState([]);   // 새로 추가된 이미지 파일 객체 배열
  const [newImagePreviews, setNewImagePreviews] = useState([]); // 새로 추가된 이미지 미리보기 배열

  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const handleStorage = () => setRole(localStorage.getItem("role") || "");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 기존 게시글 데이터 불러오기 (수정 폼 진입 시 1회)
  useEffect(() => {
    axios
      .get(`/board/boardDetail/${category}/${board_id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setExistingImages(response.data.imageFileNames || []); // 기존 이미지 파일명 배열로 세팅
      })
      .catch((error) => {
        alert("게시글 정보를 불러오지 못했습니다.");
        navigate("/boardList/free");
      });
  }, [board_id, category, navigate]);

  // 새 이미지 파일 선택 핸들러
  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews(previews);
    e.target.value = ""; // 파일 선택 후 input 초기화
  };

  // 기존 이미지 삭제 핸들러
  const handleExistingImageRemove = (idx) => {
    setDeletedImages(prev => [...prev, existingImages[idx]]);
    setExistingImages(prev => prev.filter((_, i) => i !== idx));
  };

  // 새 이미지 삭제 핸들러
  const handleNewImageRemove = (idx) => {
    setNewImagePreviews(prev => prev.filter((_, i) => i !== idx));
    setNewImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // 이미지 업로드 함수
  const handleNewImageUpload = async () => {
    if (!newImageFiles || newImageFiles.length === 0) return [];
    const formData = new FormData();
    newImageFiles.forEach(file => formData.append("files", file));
    try {
      const res = await axios.post("/board/uploadimage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // 서버에서 반환한 savedFileName 배열
    } catch (error) {
      alert("이미지 업로드 실패");
      return null;
    }
  };

  // 수정 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. 새 이미지 업로드
    let uploadedFileNames = [];
    if (newImageFiles && newImageFiles.length > 0) {
      uploadedFileNames = await handleNewImageUpload();
      if (!uploadedFileNames || uploadedFileNames.length === 0) return;
    }

    //2. 게시글 정보 + 이미지 파일명 전송
    let data = { board_id, title, content,
      // 기존 이미지 + 새로 업로드된 이미지
      imageFileNames: [...existingImages, ...(uploadedFileNames || [])],
      // 삭제할 기존 이미지 파일명 배열
      deletedImageFileNames: deletedImages
     };

    try {
      await axios.put(`/board/updateboard/${board_id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("게시글이 수정되었습니다.");

      navigate(`/boardList/${category}`); 
      
    } catch (err) {
      alert("게시글 수정에 실패했습니다.");
    }
  };

  console.log("board_id", board_id);

  return (
    <BoardInsertFormStyle>
      <div className="boardInsertFormContainer">
        <h2>게시글 수정</h2>
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
            <select
              id="category"
              name="category"
              className="categorySelect"
              value={category || ""}
              required
              disabled
            >
              {role === "ROLE_ADMIN" && (
                <option value="notice">공지사항</option>
              )}
              <option value="community">커뮤니티</option>
              <option value="faq">Q&A</option>
              <option value="free">자유게시판</option>
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
                onChange={handleNewImageChange}
                style={{ display: "none"}}
              />
              <span className="fileNameText">
                {newImageFiles.length > 0
                  ? newImageFiles.map(f => f.name).join(", ")
                  : "파일을 선택하세요."}
              </span>
            </div>
            {/* 기존 이미지 미리보기 (삭제 버튼 포함) */}
            {existingImages.length > 0 && (
              <div className="imagePreview">
                {existingImages.map((fileName, idx) => (
                  <div className="imagePreviewBox" key={fileName}>
                    <img
                      src={`http://localhost:8080/resources/webapp/userImages/${fileName}`}
                      alt={`기존이미지${idx}`}
                      width={200}
                    />
                    <button
                      type="button"
                      className="removeImageBtn"
                      onClick={() => handleExistingImageRemove(idx)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 새로 추가된 이미지 미리보기 (삭제 버튼 포함) */}
            {newImagePreviews.length > 0 && (
              <div className="imagePreview">
                {newImagePreviews.map((src, idx) => (
                  <div className="imagePreviewBox" key={idx}>
                    <img src={src} alt={`새이미지${idx}`} width={200} />
                    <button
                      type="button"
                      className="removeImageBtn"
                      onClick={() => handleNewImageRemove(idx)}
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
              수정하기
            </button>
          </div>
        </form>
      </div>
    </BoardInsertFormStyle>
  );
}
