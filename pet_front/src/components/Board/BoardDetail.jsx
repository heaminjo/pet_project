import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BoardDetailStyle from "./BoardDetailStyle";

export default function BoardDetail() {
  const { board_Id } = useParams(); // URL 파라미터에서 게시글 ID 추출
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/board/boardDetail/${board_Id}`)
      .then((response) => setPost(response.data))
      .catch((error) => setError(error));
  }, [board_Id]);

  if (error) {
    return <div>게시글을 불러오지 못했습니다. {error.message}</div>;
  }

  if (!post) {
    return <div>로딩 중...</div>;
  }

  const loginMemberId = localStorage.getItem("member_id");
  //const loginRole = localStorage.getItem("role"); // "ADMIN" 또는 "USER"

  // 작성자(member_id) 또는 관리자(ADMIN)만 버튼 보이게
  const canEditOrDelete = String(post.member_id) === String(loginMemberId); // || loginRole === "ADMIN"

  // 삭제 기능
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/board/delete/${post.board_id}`, {
          headers: {
            Authorization: `${localStorage.getItem(
              "grantType"
            )} ${localStorage.getItem("accessToken")}`,
          },
        });
        alert("삭제되었습니다.");
        navigate("/boardList");
      } catch (err) {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 수정 기능 (수정 폼으로 이동)
  const handleEdit = () => {
    navigate(`/boardEditForm/${post.board_id}`);
  };

  console.log(loginMemberId, post.member_id);

  return (
    <BoardDetailStyle>
      <div
        style={{
          width: "60%",
          margin: "40px auto",
          fontFamily: "GmarketSansMedium",
        }}
        className="boardDetailContainer"
      >
        <h2>{post.title}</h2>
        <div style={{ color: "#888", marginBottom: "10px" }}>
          작성자: {post.name} | 조회수: {post.views} | 작성일: {post.reg_date}
        </div>
        <div
          style={{ minHeight: "200px", fontSize: "18px", marginTop: "20px" }}
        >
          {post.content}
        </div>
        {canEditOrDelete && (
          <div style={{ marginTop: "30px", textAlign: "right" }}>
            <button onClick={handleEdit} style={{ marginRight: "10px" }}>
              수정
            </button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>
    </BoardDetailStyle>
  );
}
