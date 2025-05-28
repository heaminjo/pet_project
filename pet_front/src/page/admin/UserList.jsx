import AdminMenu from "../../components/admin/AdminMenu";
import UserListComp from "./UserListStyle";

export default function UserList() {
  return (
    <UserListComp>
      <div className="list_inner">
        <AdminMenu />
        <div className="list_container">d</div>
      </div>
    </UserListComp>
  );
}
