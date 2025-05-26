import { useNavigate } from "react-router-dom";
import HeaderComp from "./Headerstyle";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { PetContext } from "../../App";

export default function Header() {
  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useContext(PetContext);

  //로그아웃 클릭
  const clickLogout = () => {
    localStorage.clear();
    alert("로그아웃 됩니다.");
    setIsLogin(false);
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
              <li>
                <span onClick={() => navigate("/mypage")}>마이페이지</span>
              </li>
              <li>
                <span onClick={() => clickLogout()}>로그이웃</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <span onClick={() => navigate("/login")}>로그인</span>
              </li>
              <li>
                <span onClick={() => navigate("/join")}>회원가입</span>
              </li>
            </>
          )}
        </ul>
      </div>
      <Nav isLogin={isLogin} />
    </HeaderComp>
  );
}
