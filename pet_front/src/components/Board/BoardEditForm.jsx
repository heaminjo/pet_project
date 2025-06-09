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

  // 기존 게시글 데이터 불러오기 (수정 폼 진입 시 1회)
  useEffect(() => {
    axios
      .get(`/board/boardDetail/${category}/${board_id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        alert("게시글 정보를 불러오지 못했습니다.");
        navigate("/boardList/free");
      });
  }, [board_id, category, navigate]);

  // 수정 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = { board_id, title, content };

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
              value={category}
              required
              disabled
            >
              <option value="notice">공지사항</option>
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
