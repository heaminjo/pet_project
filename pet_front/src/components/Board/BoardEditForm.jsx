import React, { useEffect, useState } from "react";
import BoardInsertFormStyle from "./BoardInsertFormStyle";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function BoardEditForm() {
  const { board_id } = useParams(); // URL에서 게시글 id 추출
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const location = useLocation();
  const [category, setCategory] = useState(location.state?.category || "board"); // 카테고리 기본값 설정
  const navigate = useNavigate();

  // 기존 게시글 데이터 불러오기 (수정 폼 진입 시 1회)
  useEffect(() => {
    let url = "";
    switch (category) {
      case "notice":
        url = `/board/noticeboardDetail/${board_id}`;
        break;
      case "community":
        url = `/board/communityboardDetail/${board_id}`;
        break;
      case "faq":
        url = `/board/faqboardDetail/${board_id}`;
        break;
      case "board":
      default:
        url = `/board/boardDetail/${board_id}`;
        break;
    }

    axios
      .get(url)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category || category); // 카테고리 설정
      })
      .catch((error) => {
        alert("게시글 정보를 불러오지 못했습니다.");
        navigate("/boardList");
      });
  }, [board_id, navigate]);

  // 수정 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    let data = { board_id, title, content};

    // 선택한 카테고리에 따라 URL을 설정
    switch (category) {
      case "notice":
        url = `/board/noticeboardupdate/${board_id}`;
        break;
      case "community":
        url = `/board/communityboardupdate/${board_id}`;
        break;
      case "faq":
        url = `/board/faqboardupdate/${board_id}`;
        break;
      case "board":
        url = `/board/updateboard/${board_id}`;
        break;
      default:
        alert("잘못된 카테고리입니다.");
        return;
    }

    try {
      await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      alert("게시글이 수정되었습니다.");
      if(category==="notice") navigate(`/noticeboardDetail/${board_id}`); 
      else if(category==="community") navigate(`/communityboardDetail/${board_id}`);
      else if(category==="faq") navigate(`/faqboardDetail/${board_id}`);
      else if(category==="board") navigate(`/boardDetail/${board_id}`);
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
            <label htmlFor="category" className="categoryLabel">게시판</label>
            <select
              id="category"
              name="category"
              className="categorySelect"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              disabled
            >
              <option value="notice">공지사항</option>
              <option value="community">커뮤니티</option>
              <option value="faq">FAQ</option>
              <option value="board">게시판</option>
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