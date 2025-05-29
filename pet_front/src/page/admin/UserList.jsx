import { useEffect, useState } from "react";
import AdminMenu from "../../components/admin/AdminMenu";
import UserListComp from "./UserListStyle";
import AdminApi from "../../api/AdminApi";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(0);

  //페이징 정보보
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
  }, [page]);

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

    //컨텐츠 저장
    setUserList(result.content);
    console.log(result.prev);
    console.log(result.next);
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
  return (
    <UserListComp>
      <div className="list_inner">
        <AdminMenu />
        <div className="list_container">
          <h3>회원 목록 및 상세정보 </h3>
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
                <option value="email">이메일</option>
                <option value="name">이름</option>
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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="search_btn" onClick={() => searchClick()}>
                검색
              </button>
            </div>
          </div>
          <div className="list_view">
            <table>
              <tr>
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
                userList.map((m) => (
                  <tr className="user_present">
                    <td>{m.email}</td>
                    <td>{m.name}</td>
                    <td>{m.phone}</td>
                    <td>{m.birth}</td>
                    <td>{m.point}</td>
                    <td>{m.grade}</td>
                    <td>{m.memberState}</td>
                    <td>{m.regDate}</td>
                  </tr>
                ))
              ) : (
                <tr className="user_empty">
                  <td colSpan="8">조회되는 회원이 1건도 없습니다.</td>
                </tr>
              )}
            </table>
          </div>
          <div className="select_page">
            <ul className="curr_page">
              {Array.from({ length: paging.end - paging.start }, (_, index) => {
                const pageNumber = paging.start + index;
                return (
                  <li onClick={() => setPage(pageNumber)}>
                    <span className={page == pageNumber ? "current" : ""}>
                      {pageNumber + 1}
                    </span>
                  </li>
                );
              })}
              <li>
                <span id="last_page">. . . {paging.totalPages}</span>
              </li>
            </ul>
            <div className="page_btn">
              {paging.start != 0 && (
                <button className="move" id="first" onClick={() => setPage(0)}>
                  ◀◀
                </button>
              )}
              {paging.isPrev && (
                <button
                  className="move"
                  id="prev"
                  onClick={() => setPage(page - 1)}
                >
                  ◀
                </button>
              )}

              {paging.isNext && (
                <button
                  className="move"
                  id="next"
                  onClick={() => setPage(page + 1)}
                >
                  ▶
                </button>
              )}
              {paging.end != paging.totalPages && (
                <button
                  className="move"
                  id="last"
                  onClick={() => setPage(paging.totalPages - 1)}
                >
                  ▶▶
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </UserListComp>
  );
}
