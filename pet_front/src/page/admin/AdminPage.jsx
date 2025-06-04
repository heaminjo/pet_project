import { Outlet, useNavigate } from "react-router-dom";
import AdminApi from "../../api/AdminApi";
import AdminMenu from "../../components/admin/AdminMenu";
import MypageMenu from "../../components/mypage/MyPageMenu";
import AdminPageComp from "./AdminPageStyle";
import { useEffect, useState } from "react";

//관리자 페이지지
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
