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
          <table border="1">
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
                <td>{m.state}</td>
                <td>{m.regDate}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </UserListComp>
  );
}
