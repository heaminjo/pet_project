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
  const [type, setType] = useState("all");        
  const [keyword, setKeyword] = useState("");     // 실제 검색에 사용되는 값
  const [inputKeyword , setInputKeyword] = useState(""); 
  const [page, setPage] = useState(0);

  const params = new URLSearchParams(location.search);
  const typeParam = params.get("type") || "all";
  const keywordParam = params.get("keyword") || "";
  const sortParam = params.get("sort") || "desc";
  const pageParam = parseInt(params.get("page")) || 0;

  useEffect(() => {
    setType(typeParam);
    setKeyword(keywordParam);
    setSort(sortParam);
    setPage(pageParam);
  }, [typeParam, keywordParam, sortParam, pageParam]);

  const searchClick = () => {
    setPage(0); // 검색 시 1페이지로 이동
    // 쿼리스트링 방식으로 검색 조건 반영 (팀원 코드와 일치)
    const params = new URLSearchParams();
    params.set("type", type);
    params.set("keyword", inputKeyword);
    params.set("sort", sort);
    params.set("page", 0);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const token = localStorage.getItem("accessToken");
  function getMember_idFromToken(token) {
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
  const member_id = getMember_idFromToken(token);

  

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
      member_id: member_id,
      page: page,
      size: paging.size,
      type: type,
      keyword: keyword,
      sort: sort,
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
  }, [member_id, page, type, keyword, sort, location.search]);

  if (error) {
    return <div>내 게시글을 불러오지 못했습니다. =&gt; {error.message}</div>;
  }

    
  return (
    <MyBoardListComp>
      <div className="list_container">
        <h3>내 게시물 목록</h3>
        <hr />
        <div className="search">
          <div className="search_type">
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="notice">공지사항</option>
              <option value="faq">Q&A</option>
              <option value="community">커뮤니티</option>
              <option value="free">자유게시판</option>
            </select>
            <select
              name="sort"
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="desc">최신순</option>
              <option value="asc">오래된 순</option>
            </select>
          </div>

          <div className="search_input">
            <input
              type="text"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
            />
            <button className="search_btn" onClick={() => searchClick()}>
              검색
            </button>
          </div>
        </div>
        <div className="list_view">
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
                    <td className="center">
                      {b.category === "notice"
                        ? "공지사항"
                        : b.category === "faq"
                        ? "Q&A"
                        : b.category === "community"
                        ? "커뮤니티"
                        : b.category === "free"
                        ? "자유게시판"
                        : b.category}
                    </td>
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
        </div>
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
      </div>
    </MyBoardListComp>
  );
}
