import { useNavigate } from "react-router-dom";
import HeaderComp from "./Headerstyle";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { PetContext } from "../../App";
import MemberApi from "../../api/MemberApi";

export default function Header() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));

  //로그아웃 클릭
  const clickLogout = async () => {
    await MemberApi.logout();
    localStorage.clear();
    alert("로그아웃 됩니다.");
    navigate("/");
  };
  return (
    <HeaderComp>
      <div className="header_inner">
        <div className="header_title">
          <h1 onClick={() => navigate("/")}>몽냥마켓</h1>
        </div>

        <ul className="member_menu">
          {localStorage.getItem("loginName") != null ? (
            <>
              <li>
                <span>{localStorage.getItem("loginName")}님 환영합니다</span>
              </li>
              {localStorage.getItem("role") == "ROLE_USER" && (
                <li>
                  <span onClick={() => navigate("/user/mypage")}>
                    마이페이지
                  </span>
                </li>
              )}
              {localStorage.getItem("role") == "ROLE_ADMIN" && (
                <li>
                  <span onClick={() => navigate("/admin/page")}>
                    관리자 메뉴
                  </span>
                </li>
              )}
              <li>
                <span onClick={() => clickLogout()}>로그아웃</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <span onClick={() => navigate("/user/login")}>로그인</span>
              </li>
              <li>
                <span onClick={() => navigate("/user/join")}>회원가입</span>
              </li>
            </>
          )}
        </ul>
      </div>
      <Nav />
    </HeaderComp>
  );
}
