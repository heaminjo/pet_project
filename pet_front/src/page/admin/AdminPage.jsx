import { useNavigate } from "react-router-dom";
import AdminApi from "../../api/AdminApi";
import AdminMenu from "../../components/admin/AdminMenu";
import MypageMenu from "../../components/mypage/MyPageMenu";
import AdminPageComp from "./AdminPageStyle";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    try {
      const result = await AdminApi.detail();
      setUser(result);
      console.log(result);
    } catch (e) {
      localStorage.clear();
      alert(e.response.data.message);
      navigate("/login");
    }
  };
  return (
    <AdminPageComp>
      <div className="admin_inner">
        <AdminMenu />
      </div>
    </AdminPageComp>
  );
}
