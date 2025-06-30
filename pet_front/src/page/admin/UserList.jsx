import { useEffect, useState } from "react";
import UserListComp from "./UserListStyle";
import AdminApi from "../../api/AdminApi";
import PageNumber from "../../components/util/PageNumber";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(0);

  //페이징 정보
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  //첫 화면 로드 시
  //1페이지 ,최신순,전체출력을 페이징한 리스트 출력
  useEffect(() => {
    getPageList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, sort]);

  //검색 목록 Api
  const getPageList = async () => {
    const pages = {
      page: page,
      size: 12,
      sortBy: sort,
      keyword: keyword,
      type: type,
    };
    const result = await AdminApi.getPageList(pages);
    console.log(result);
    //컨텐츠 저장
    setUserList(result.content);
    let temp = Math.floor(page / 5) * 5;

    //페이지번호 정보 저장
    setPaging({
      start: temp,
      end: Math.min(temp + 5, result.totalPages),
      isPrev: result.prev,
      isNext: result.next,
      totalElement: result.totalElements,
      totalPages: result.totalPages,
    });
  };

  //검색 버튼 클릭
  const searchClick = () => {
    setPage(0);
    getPageList();
  };

  //검색버튼 엔터
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //검색
      searchClick();
    }
  };

  //유저 상세보기 클릭
  //유저 이메일을 넘긴다.
  const userDetail = (id) => {
    navigate("/admin/page/userdetail", { state: { id: id } });
  };

  const getBgColor = (state) => {
    switch (state) {
      case "정상회원":
        return "lightgreen";
      case "정지회원":
        return "lightcoral";
      case "탈퇴회원":
        return "lightgray";
      case "임시회원":
        return "lightpink";
      default:
        return "white";
    }
  };
  return (
    <UserListComp>
      <div className="list_container">
        <h3>회원 목록 및 상세정보 </h3>
        <hr />
        <div className="search">
          <div className="search_type">
            <select
              name="sort"
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="desc">최신순</option>
              <option value="asc">오래된 순</option>
            </select>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="email">이메일</option>
              <option value="name">이름</option>
            </select>
          </div>

          <div className="search_input">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search_btn" onClick={() => searchClick()}>
              검색
            </button>
          </div>
        </div>
        <div className="list_view">
          <table>
            <tr>
              <th>번호</th>
              <th style={{ width: "25%" }}>이메일</th>
              <th style={{ width: "10%" }}>이름</th>
              <th style={{ width: "13%" }}>휴대번호</th>
              <th style={{ width: "10%" }}>생년월일</th>
              <th>포인트</th>
              <th>등급</th>
              <th>상태</th>
              <th>가입 날짜</th>
            </tr>

            {userList.length > 0 ? (
              userList.map((m, index) => (
                <tr className="user_present" onClick={() => userDetail(m.id)}>
                  <td align="center">{index + 1 + page * 12}</td>
                  <td id="email_col">{m.email}</td>
                  <td id="name_col">{m.name}</td>
                  <td id="phone_col">{m.phone}</td>
                  <td id="birth_col">{m.birth}</td>
                  <td id="point_col">{m.point}</td>
                  <td id="grade_col">{m.grade}</td>
                  <td
                    style={{ color: getBgColor(m.memberState) }}
                    id="state_col"
                  >
                    {m.memberState}
                  </td>
                  <td id="date_col">{m.regDate}</td>
                </tr>
              ))
            ) : (
              <tr className="user_empty">
                <td colSpan="8">조회되는 회원이 1건도 없습니다.</td>
              </tr>
            )}
          </table>
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </UserListComp>
  );
}
