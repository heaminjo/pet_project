import { Outlet, useNavigate } from "react-router-dom";
import AdminApi from "../../api/AdminApi";
import AdminMenu from "../../components/admin/AdminMenu";
import { useEffect } from "react";
import AdminPageComp from "./AdminPageStyle";

export default function AdminPage() {
  const navigate = useNavigate();
  useEffect(() => {
    getLoginUser();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getLoginUser = async () => {
    try {
      await AdminApi.detail();
    } catch (e) {
      navigate("/error", { state: { message: "권한이 없는 페이지 입니다." } });
    }
  };
  return (
    <AdminPageComp>
      <div className="admin_inner">
        <AdminMenu />
        <Outlet />
      </div>
    </AdminPageComp>
  );
}
