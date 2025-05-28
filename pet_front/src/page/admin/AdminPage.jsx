import AdminMenu from "../../components/admin/AdminMenu";
import MypageMenu from "../../components/mypage/MyPageMenu";
import AdminPageComp from "./AdminPageStyle";

export default function AdminPage() {
  return (
    <AdminPageComp>
      <div className="admin_inner">
        <AdminMenu />
      </div>
    </AdminPageComp>
  );
}
