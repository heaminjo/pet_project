import { useEffect, useState } from "react";
import axios from "axios";
import MyBoardListComp from "./MyBoardListStyle";
import PageNumber from "../../components/util/PageNumber";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyBoardList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("desc");
  const params = new URLSearchParams(location.search);
  const searchType = params.get("searchType") || "title";
  const searchKeyword = params.get("searchKeyword") || "";
  const page = parseInt(params.get("page")) || 0;
  const [inputKeyword, setInputKeyword] = useState(searchKeyword);

  const token = localStorage.getItem("accessToken");
  function getMemberIdFromToken(token) {
    if (!token) return null;
    try {
      const base64Payload = token.split('.')[1];
      const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      return payload.member_id || payload.sub || null;
    } catch (e) {
      return null;
    }
  }
  const memberId = getMemberIdFromToken(token);

  useEffect(() => {
    setInputKeyword(searchKeyword);
  }, [searchKeyword]);

  //페이징 정보
  const [paging, setPaging] = useState({
    page: 0,
    size: 10, // [수정] 한 페이지에 10개씩
    totalElements: 0,
    totalPages: 1,
    isPrev: false,
    isNext: true,
    start: 0,
    end: 1,
  });

 


  useEffect(() => {
    // [수정] 내 게시글만 조회하는 API 호출
    const apiUrl = `/board/myboardList`;
    const params = {
      member_id: memberId,
      page: page,
      size: paging.size,
      searchType: searchType,
      searchKeyword: searchKeyword,
    };
    axios
      .get(apiUrl, { params })
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
          end: Math.min(temp + 3, response.data.totalPages),
        }));
      })
      .catch((error) => setError(error));
  }, [memberId, page, searchType, searchKeyword, location.search]);

  if (error) {
    return <div>내 게시글을 불러오지 못했습니다. =&gt; {error.message}</div>;
  }

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.set("searchType", searchType);
    params.set("searchKeyword", inputKeyword);
    params.set("page", 0);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  

  
  return (
    <MyBoardListComp>
      <div className="list_container">
        <h3>내 게시물 목록</h3>
        <hr />
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>게시판</th>
              <th style={{ width: "25%" }}>제목</th>
              <th style={{ width: "10%" }}>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {(!listData || listData.length === 0) ? (
              <tr>
                <td colSpan={5} className="center" style={{ textAlign: "center", padding: "20px" }}>
                  작성한 게시물이 없습니다.
                </td>
              </tr>
            ) : (
              listData.map((b, index) => (
                <tr key={b.board_id}>
                  <td className="center">{paging.totalElements - (paging.page * paging.size) - index}</td>
                  <td className="center">{b.category}</td>
                  <td
                    className="center"
                    onClick={() => navigate(`/boardDetail/${b.category}/${b.board_id}${location.search}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {b.title}
                  </td>
                  <td className="center">{b.name}</td>
                  <td className="center">{b.reg_date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="pageNumber">
          <PageNumber page={page} setPage={(newPage) => {
            const params = new URLSearchParams(location.search);
            params.set("page", newPage);
            navigate({
              pathname: location.pathname,
              search: params.toString(),
            });
          }} paging={paging} />
        </div>
        <form
          className="search-bar"
          style={{ display: "flex", alignItems: "center", margin: "30px 0 0 0" }}
          onSubmit={handleSearch}
        >
          <div className="custom-select">
            <select
              value={searchType}
              onChange={e => {
                const params = new URLSearchParams(location.search);
                params.set("searchType", e.target.value);
                params.set("page", 0);
                navigate({
                  pathname: location.pathname,
                  search: params.toString(),
                });
              }}
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writer">작성자</option>
            </select>
          </div>
          <input
            type="text"
            value={inputKeyword}
            onChange={e => setInputKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <button type="submit">
            <span role="img" aria-label="search">🔍</span>
          </button>
        </form>
      </div>
    </MyBoardListComp>
  );
}
