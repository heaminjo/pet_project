import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardListStyle from "./BoardListStyle";
import { useNavigate } from "react-router-dom";

export default function BoardList({ isLogin }) {  // 나중에 login 여부에 따라 글쓰기 버튼을 보여줄지 말지 결정할 수 있음
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/board/boardList")
      .then(response => setListData(response.data))
      .catch(error => setError(error));
  }, []);

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
            <li>공지사항</li>
            <li>커뮤니티</li>
            <li>문의/FAQ</li>
            <li onClick={() => navigate("/boardList")}>게시판</li>
          </ul>
        </div>
        <table>                                 
          <thead>
            <tr>
              <td colSpan={5} height={50}>게시판</td>
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
            {listData.map((b) => (
              <tr key={b.board_id}>
                <td className="center">{b.board_id}</td>
                <td className="center" onClick={() => navigate(`/boardDetail/${b.board_id}`)} style={{ cursor: "pointer" }}>{b.title}</td>
                <td className="center">{b.name}</td>
                <td className="center">{b.views}</td>
                <td className="center">{b.reg_date}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} align="right">
                <button 
                  type="button"
                  onClick={() => {
                    if (!isLogin) {
                      alert("로그인 해주세요");
                      navigate("/login");
                    } else {
                      navigate("/boardInsertForm");
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

