import BoardInsertFormStyle from "./BoardInsertFormStyle";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axiosInstance";
import MemberApi from "../../api/MemberApi";

export default function BoardInsertForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("default"); // 기본값 설정
  const [role, setRole] = useState(sessionStorage.getItem("role") || "");
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);

  // 파일 선택 핸들러 (이미지+문서 모두)
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const images = [];
    const imagesPreview = [];
    const others = [];
    selected.forEach((file) => {
      if (file.type.startsWith("image/")) {
        images.push(file);
        imagesPreview.push(URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
      } else {
        others.push(file);
      }
    });
    setFiles((prev) => [...prev, ...selected]); // 기존 파일에 새로 선택한 이미지 파일 추가
    setImagePreviews((prev) => [...prev, ...imagesPreview]); // 이미지 미리보기 업데이트
    setOtherFiles((prev) => [...prev, ...others]); // 문서 파일 업데이트
    e.target.value = ""; // 파일 선택 후 input 초기화
  };

  // 파일 업로드 함수
  const handleFileUpload = async () => {
    if (!files || files.length === 0) return [];
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await instance.post("/board/uploadfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // 서버에서 반환한 savedFileName
    } catch (error) {
      alert("이미지 업로드 실패");
      return null;
    }
  };

  //멤버 상태 검사
  const memberState = async () => {
    const member = await MemberApi.detail();
    console.log(member);
    if (member.state == "정지회원") {
      alert("정지된 회원은 게시글을 작성할 수 없습니다.");
      navigate(-1);
    }
  };

  useEffect(() => {
    memberState();
    const handleStorage = () => setRole(sessionStorage.getItem("role") || "");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

    // 파일 업로드
    let fileList = [];
    if (files.length > 0) {
      fileList = await handleFileUpload();
      if (!fileList) return; //업로드 실패 시 중단
    }

    //2. 게시글 정보 + 파일 리스트 전송
    let data = { title, content, category, fileList };
    let url = `/board/insertBoard/${category}`;

    try {
      await instance.post(url, data);
      console.log("category:", category, "url:", url);

      // 등록 후 해당 게시판 목록으로 이동
      if (category === "notice") navigate(`/boardList/${category}`);
      else if (category === "community") navigate(`/boardList/${category}`);
      else if (category === "faq") navigate(`/boardList/${category}`);
      else if (category === "free") navigate(`/boardList/${category}`);
    } catch (err) {
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const handleFileRemove = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
    setOtherFiles((prev) => prev.filter((_, i) => i !== idx));
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
              <option value="default" disabled>
                게시판 선택
              </option>
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
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span className="fileNameText">
                {files.length > 0
                  ? files.map((f) => f.name).join(", ")
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
                      onClick={() => handleFileRemove(idx)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* 문서/압축 등 파일 리스트 */}
            {otherFiles.length > 0 && (
              <ul className="otherFileList">
                {otherFiles.map((file, idx) => (
                  <li key={idx}>
                    {file.name}
                    <button
                      type="button"
                      className="removeFileBtn"
                      onClick={() => handleFileRemove(idx)}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
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
