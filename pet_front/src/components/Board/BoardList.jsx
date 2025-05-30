import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardListStyle from "./BoardListStyle";
import { useNavigate, useParams } from "react-router-dom";


export default function BoardList() {
  const { category } = useParams(); // URL 파라미터에서 카테고리 추출
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 카테고리별 API 엔드포인트 매핑
  const categoryApiMap = {
    notice: "/board/boardList/notice",
    community: "/board/boardList/community",
    faq: "/board/boardList/faq",
    free: "/board/boardList/free"
  };

  // 카테고리별 게시판 이름 매핑
  const categoryNameMap = {
    notice: "공지사항",
    community: "커뮤니티",
    faq: "문의/FAQ",
    free: "자유게시판"
  };

  useEffect(() => {
    // 카테고리가 없으면 기본 board로 설정
    const apiUrl = categoryApiMap[category] || "/board/boardList/free";
    axios
      .get(apiUrl)
      .then((response) => setListData(response.data))
      .catch((error) => setError(error));
  }, [category]);

  if (error) {
    // 서버 에러 코드에 따라 메시지 분기
    if (error.response && error.response.status === 502) {
      return <div>{error.response.data}</div>;
    }
    return <div>게시판을 불러오지 못했습니다. =&gt; {error.message}</div>;
  }

  return (
    <BoardListStyle>
      <div className="boardListContainer">
        <div className="boardListMenuContainer">
          <ul className="boardListMenu">
            {/* 클릭하면 해당 카테고리로 이동하게 코딩 */}
            <li onClick={()=>navigate("/boardList/notice")}>공지사항</li>
            <li onClick={()=>navigate("/boardList/community")}>커뮤니티</li>
            <li onClick={()=>navigate("/boardList/faq")}>Q&A</li>
            <li onClick={() => navigate("/boardList/free")}>게시판</li>
          </ul>
        </div>
        <table>
          <thead>
            <tr>
              <td colSpan={5} height={50}>
                {/* 해당 게시판의 종류에 따라 게시판 이름 표시 */}
                { categoryNameMap[category] || "자유게시판"}
              </td>
            </tr>
            <tr style={{ backgroundColor: " #f8e776" }}>
              <th>NO</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {(!listData || listData.length === 0) ? (
              <tr>
                <td colSpan={5} className="center" style={{ textAlign: "center", padding: "20px" }}>
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
            listData.map((b, index) => (
              <tr key={index}>
                <td className="center">{listData.length - index}</td>
                <td
                  className="center"
                  onClick={() => navigate(`/boardDetail/${category}/${b.board_id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {b.title}
                </td>
                <td className="center">{b.name}</td>
                <td className="center">{b.views}</td>
                <td className="center">{b.reg_date}</td>
              </tr>
              ))
            )}
            <tr>
              <td colSpan={5} align="right">
                <button
                  type="button"
                  onClick={() => {
                    if (localStorage.getItem("accessToken")!=null) {
                      navigate(`/boardInsertForm?category=${category || "board"}`);
                    } else {
                      alert("로그인 해주세요");
                      navigate("/login?redirectTo=/boardInsertForm");
                    }
                  }}
                >
                  글쓰기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BoardListStyle>
  );
}
