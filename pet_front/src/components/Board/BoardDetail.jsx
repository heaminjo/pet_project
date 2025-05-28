import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BoardDetailStyle from "./BoardDetailStyle";


  // jwt 토큰에서 로그인한 회원의 ID를 가져옴
  function getMemberIdFromToken(token) {
    if(!token) return null;
    try {
      //1. 토큰을 .으로 분리
      const base64Payload = token.split('.')[1];
      //2. base64payload -> base64로 디코딩 
      const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      //3. base64 디코딩 (atob 사용)
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      //4. JSON 파싱
      const payload = JSON.parse(jsonPayload);
      //5. member_id 반환
      return payload.member_id || payload.sub || null;
    } catch (e) {
      return null;
    }
  }  


export default function BoardDetail() { 
  const { board_Id } = useParams(); // URL 파라미터에서 게시글 ID 추출
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/board/boardDetail/${board_Id}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("grantType")} ${localStorage.getItem("accessToken")}`
        }
      }
    )
      .then(response => setPost(response.data))
      .catch(error => setError(error));
  }, [board_Id]);

  if (error) {
    return <div>게시글을 불러오지 못했습니다. {error.message}</div>;
  }
  
  if (!post) {
    return <div>로딩 중...</div>;
  }

  const token = localStorage.getItem("accessToken");
  const loginMemberId = getMemberIdFromToken(token); // JWT 토큰에서 로그인한 회원의 ID를 가져옴
  //const loginRole = localStorage.getItem("role"); // "ADMIN" 또는 "USER"

  // 작성자(member_id) 또는 관리자(ADMIN)만 버튼 보이게
  const canEditOrDelete = String(post.member_id) === String(loginMemberId); // || loginRole === "ADMIN"


   // 삭제 기능
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/board/delete/${post.board_id}`, {
          headers: {
            Authorization: `${localStorage.getItem("grantType")} ${localStorage.getItem("accessToken")}`
          }
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

  console.log("loginMemberId:", loginMemberId, "post.member_id:", post.member_id);

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
        {canEditOrDelete && (
          <div style={{ marginTop: "30px", textAlign: "right" }}>
            <button onClick={handleEdit} style={{ marginRight: "10px" }}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>
    </BoardDetailStyle>
  );
}
