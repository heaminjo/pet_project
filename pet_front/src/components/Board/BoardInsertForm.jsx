import BoardInsertFormStyle from "./BoardInsertFormStyle";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BoardInsertForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const member_id = localStorage.getItem("member_id");
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/board/insert", { member_id, title, content });
      alert("게시글이 등록되었습니다.");
      navigate("/boardList"); // 등록 후 게시판 목록으로 이동
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
            <label htmlFor="title" className="titleLabel">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              className="titleInput"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="contentRow">
            <label htmlFor="content" className="contentLabel">내용</label>
            <textarea
              id="content"
              name="content"
              className="contentTextarea"
              value={content}
              onChange={e => setContent(e.target.value)}
              required>
            </textarea>
          </div>
          <div className="buttonRow">
            <button type="submit" className="submitBtn">등록하기</button>
          </div>
        </form>
      </div>
    </BoardInsertFormStyle>
  );
}