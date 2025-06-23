import React, { useEffect, useState } from "react";
import BoardInsertFormStyle from "./BoardInsertFormStyle";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function BoardEditForm() {
  const { category, board_id } = useParams(); // URL에서 게시글 id 추출
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // 카테고리 기본값 설정
  const navigate = useNavigate();
  const [existingFiles, setExistingFiles] = useState([]); // 기존 이미지 파일명 배열
  const [deletedFiles, setDeletedFiles] = useState([]);   // 삭제할 기존 이미지 파일명 배열
  const [newFiles, setNewFiles] = useState([]);   // 새로 추가된 이미지 파일 객체 배열
  const [newImagePreviews, setNewImagePreviews] = useState([]); // 새로 추가된 이미지 미리보기 배열
  const [newOtherFiles, setNewOtherFiles] = useState([]); // 새로 추가된 문서 파일 객체 배열

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
        console.log("fileList", response.data.fileList);
        setTitle(response.data.title);
        setContent(response.data.content);
        setExistingFiles(response.data.fileList || []); // 기존 이미지 파일명 배열로 세팅
      })
      .catch((error) => {
        alert("게시글 정보를 불러오지 못했습니다.");
        navigate("/boardList/free");
      });
  }, [board_id, category, navigate]);

  // 새 파일 선택 핸들러
  const handleNewFileChange = (e) => {
    const files = Array.from(e.target.files);
    const images = [];
    const imagesPreview = [];
    const others = [];
    files.forEach(file => {
      if (file.type.startsWith("image/")) {
        images.push(file);
        imagesPreview.push(URL.createObjectURL(file));
      } else {
        others.push(file);
      }
    });
    setNewFiles(prev => [...prev, ...files]);
    setNewImagePreviews(prev => [...prev, ...imagesPreview]);
    setNewOtherFiles(prev => [...prev, ...others]);
    e.target.value = "";
  };

  // 기존 이미지 삭제 핸들러
  const handleExistingFileRemove = (idx) => {
    setDeletedFiles(prev => [...prev, existingFiles[idx].file_name]);
    setExistingFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // 새 파일 삭제 핸들러
  const handleNewFileRemove = (idx) => {
    setNewFiles(prev => prev.filter((_, i) => i !== idx));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== idx));
    setNewOtherFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // 파일 업로드 함수
  const handleNewFileUpload = async () => {
    if (!newFiles || newFiles.length === 0) return [];
    const formData = new FormData();
    newFiles.forEach(file => formData.append("files", file));
    try {
      const res = await axios.post("/board/uploadfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // [{file_name, origin_name, file_type}, ...]
    } catch (error) {
      alert("파일 업로드 실패");
      return null;
    }
  };

  // 수정 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 유효성 검사
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (category === "default") {
      alert("게시판을 선택해주세요.");
      return;
    }
  
    // 새 파일 업로드
    let uploadedFileList = [];
    if (newFiles.length > 0) {
      uploadedFileList = await handleNewFileUpload();
      if (!uploadedFileList) return;
    }
  
    // 전체 fileList = 기존(삭제 안 한 것) + 새로 업로드된 것
    const fileList = [
      ...existingFiles, // 기존 파일(삭제 안 한 것)
      ...(uploadedFileList || []) // 새로 업로드한 파일
    ];
  
    const data = {
      board_id,
      title,
      content,
      fileList,
      deletedFileNames: deletedFiles // 서버에서 삭제 처리
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
          <div className="fileRow">
            <div className="uploadBox">
              <label htmlFor="file" className="fileLabel">
                파일 업로드
              </label>
              <input
                type="file"
                id="file"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.hwp,.ppt,.pptx"
                multiple
                onChange={handleNewFileChange}
                style={{ display: "none"}}
              />
              <span className="fileNameText">
                {newFiles.length > 0
                  ? newFiles.map(f => f.name).join(", ")
                  : "파일을 선택하세요."}
              </span>
            </div>
            {/* 기존 이미지 미리보기 (삭제 버튼 포함) */}
            {existingFiles.length > 0 && (
              <div className="imagePreview">
                {existingFiles.map((file, idx) => (
                  <div className="imagePreviewBox" key={file.file_name}>
                    {file.file_type && file.file_type.startsWith("image/") ? (
                      <img src={`http://localhost:8080/resources/webapp/userImages/${file.file_name}`} alt={file.origin_name} width={200} />
                    ) : (
                      <span>{file.origin_name}</span>
                    )}
                    <button
                      type="button"
                      className="removeFileBtn"
                      onClick={() => handleExistingFileRemove(idx)}
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
                      className="removeFileBtn"
                      onClick={() => handleNewFileRemove(idx)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
            {newOtherFiles.length > 0 && (
              <ul className="otherFileList">
                {newOtherFiles.map((file, idx) => (
                  <li key={idx}>
                    {file.name}
                    <button type="button" className="removeFileBtn" onClick={() => handleNewFileRemove(idx)}>x</button>
                  </li>
                ))}
              </ul>
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
