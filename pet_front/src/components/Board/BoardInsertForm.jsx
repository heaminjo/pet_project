import BoardInsertFormStyle from "./BoardInsertFormStyle";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BoardInsertForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("notice");
  
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    let data = {title, content};

    // 선택한 카테고리에 따라 URL을 설정
    switch (category) {
      case "notice":
        url = "/board/noticeboardinsert";
        break;
      case "community":
        url = "/board/communityboardinsert";
        break;
      case "faq":
        url = "/board/faqboardinsert";
        break;
      case "board":
        url = "/board/boardinsert";
        break;
      default:
        alert("잘못된 카테고리입니다.");
        return;
    }

    try {
      await axios.post(url, data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
      alert("게시글이 등록되었습니다.");
      console.log("category:", category, "url:", url);

      // 등록 후 해당 게시판 목록으로 이동  
      if(category==="notice") navigate("/noticeboardList"); 
      else if(category==="community") navigate("/communityboardList");
      else if(category==="faq") navigate("/faqboardList");
      else if(category==="board") navigate("/boardList");
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
          <div className="categoryRow">
            <label htmlFor="category" className="categoryLabel">게시판</label><br></br>
            <select
              id="category"
              name="category"
              className="categorySelect"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="notice">공지사항</option>
              <option value="community">커뮤니티</option>
              <option value="faq">FAQ</option>
              <option value="board">게시판</option>
              {/* 필요시 더 추가 */}
            </select>
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