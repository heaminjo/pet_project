import { Outlet, useNavigate } from "react-router-dom";
import AdminApi from "../../api/AdminApi";
import AdminMenu from "../../components/admin/AdminMenu";
import MypageMenu from "../../components/mypage/MyPageMenu";
import { useEffect, useState } from "react";
import AdminPageComp from "./AdminPageStyle";

export default function AdminPage() {
  return (
    <AdminPageComp>
      <div className="admin_inner">
        <AdminMenu />
        <Outlet />
      </div>
    </AdminPageComp>
  );
}
