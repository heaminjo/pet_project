import { useEffect, useState } from "react";
import AdminMenu from "../../components/admin/AdminMenu";
import UserListComp from "./UserListStyle";
import AdminApi from "../../api/AdminApi";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("desc");

  const getUserList = async () => {
    const result = await AdminApi.userList();
    setUserList(result);
  };

  useEffect(() => {
    getUserList();
  }, []);

  //검색 목록
  const getKeywordList = async () => {
    const result = await AdminApi.userKeywordList(type, keyword);
    setUserList(result);
  };

  //검색 버튼 클릭
  const searchClick = () => {
    //만약 입력값이 없거나 전부 출력
    if (keyword.length < 1) {
      console.log("전체 출력합니다.");
      getUserList();
    } else {
      getKeywordList();
    }
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
                <option value="grade">등급</option>
                <option value="state">상태</option>
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
          <table>
            <tr>
              <th>이메일</th>
              <th>이름</th>
              <th>휴대번호</th>
              <th>생년월일</th>
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
      </div>
    </UserListComp>
  );
}
