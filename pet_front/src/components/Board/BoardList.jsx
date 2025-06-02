import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardListStyle from "./BoardListStyle";
import { useNavigate, useParams } from "react-router-dom";
import PageNumber from "../util/PageNumber";


export default function BoardList() {
  const { category } = useParams(); // URL 파라미터에서 카테고리 추출
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("title");
  const [searchKeyword, setSearchKeyword] = useState("");

  // pageNumber 상태 변수 추가
  const [paging, setPaging] = useState({
    page: 0,
    size: 3,
    totalElements: 0,
    totalPages: 1,
    isPrev: false,
    isNext: true,
    start: 0,
    end: 1,
  });
  const [page, setPage] = useState(0);

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
      .get(apiUrl, { params: { page, size: paging.size } })
      .then((response) => {
        setListData(response.data.content || []);
        let temp = Math.floor(page / 3) * 3;
        setPaging(prev => ({ 
          ...prev,
          page: response.data.page,
          size: response.data.size,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
          isPrev: response.data.prev,
          isNext: response.data.next,
          start: temp,
          end: Math.min(temp +3, response.data.totalPages),
        }));
      })
      .catch((error) => setError(error));
      // eslint-disable-next-line
  }, [category, page]);

  if (error) {
    // 서버 에러 코드에 따라 메시지 분기
    if (error.response && error.response.status === 502) {
      return <div>{error.response.data}</div>;
    }
    return <div>게시판을 불러오지 못했습니다. =&gt; {error.message}</div>;
  }

  //검색 기능

  const handleSearch = () => {
    const apiUrl = categoryApiMap[category] || "/board/boardList/free";
    axios.get(apiUrl, {
      params: {
        page: 0,
        size: paging.size,
        searchType: searchType,
        searchKeyword: searchKeyword
      }
    })
    .then((response) => {
      setListData(response.data.content || []);
      setPaging({
        page: response.data.page,
        size: response.data.size,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        isPrev: response.data.prev,
        isNext: response.data.next,
        start: 0,
        end: Math.min(3, response.data.totalPages),
      });
      setPage(0); // 검색 후 페이지를 0으로 초기화
    })
    .catch((error) => { setError(error);
      console.error("검색 중 오류 발생:", error);
    });
  };




  return (
    <BoardListStyle>
      <div className="boardListContainer">
        <div className="boardListMenuContainer">
          <ul className="boardListMenu">
            {/* 클릭하면 해당 카테고리로 이동 */}
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
                <td className="center">{paging.totalElements -(paging.page * paging.size) - index}</td>
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
        <div className="pageNumber">
          <PageNumber page={page} setPage={setPage} paging={paging} />
        </div>  
        <div className="search-bar" style={{ display: "flex", alignItems: "center", margin: "30px 0 0 0" }}>
          <div className="custom-select">
            <select
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writer">작성자</option>
            </select>
          </div>
          <input
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            
            onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
          />
          <button
            onClick={handleSearch}
            
          >
          <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
      </div>
    </BoardListStyle>
  );
}
