import { useLocation } from "react-router-dom";
import UserDetailComp from "./UserDetailStyle";
import AdminMenu from "../../components/admin/AdminMenu";

export default function UserDetail() {
  const location = useLocation();
  const { memberId } = location.state || {};
  console.log(memberId);
  return (
    <UserDetailComp>
      <div className="detail_inner">
        <AdminMenu />
        <div className="detail_container">
          <h1>{memberId}</h1>
        </div>
      </div>
    </UserDetailComp>
  );
}
