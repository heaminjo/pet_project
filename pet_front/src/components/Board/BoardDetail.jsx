import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BoardDetailStyle from "./BoardDetailStyle";

export default function BoardDetail() { 
  const { board_Id } = useParams(); // URL 파라미터에서 게시글 ID 추출
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/board/boardDetail/${board_Id}`)
      .then(response => setPost(response.data))
      .catch(error => setError(error));
  }, [board_Id]);

  if (error) {
    return <div>게시글을 불러오지 못했습니다. {error.message}</div>;
  }
  
  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <BoardDetailStyle>
      <div style={{ width: "60%", margin: "40px auto", fontFamily: "GmarketSansMedium" }} className="boardDetailContainer">
        <h2>{post.title}</h2>
        <div style={{ color: "#888", marginBottom: "10px" }}>
          작성자: {post.name} | 조회수: {post.views} | 작성일: {post.reg_date}
        </div>
        <div style={{ minHeight: "200px", fontSize: "18px", marginTop: "20px" }}>
          {post.content}
        </div>
      </div>
    </BoardDetailStyle>
  );
}
