import { useEffect, useState } from "react";
import AdminMenu from "../../components/admin/AdminMenu";
import UserListComp from "./UserListStyle";
import AdminApi from "../../api/AdminApi";

export default function UserList() {
  const [userList, setUserList] = useState([]);

  const getUserList = async () => {
    const result = await AdminApi.userList();
    setUserList(result);
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <UserListComp>
      <div className="list_inner">
        <AdminMenu />
        <div className="list_container">
          <h3>회원 목록 및 상세정보 </h3>
          <hr />
          <div className="search">
            <div className="search_type">
              <select name="type" id="type">
                <option value="all">전체</option>
                <option value="email">이메일</option>
                <option value="name">이름</option>
                <option value="email">휴대번호</option>
                <option value="email">생년월일</option>
                <option value="email">등급</option>
                <option value="email">상태</option>
              </select>
            </div>
            <div className="search_input">
              <input type="text" />
              <button className="search_btn">검색</button>
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
            {userList.map((m) => (
              <tr>
                <td>{m.email}</td>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>{m.birth}</td>
                <td>{m.phone}</td>
                <td>{m.grade}</td>
                <td>{m.memberState}</td>
                <td>{m.regDate}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </UserListComp>
  );
}
