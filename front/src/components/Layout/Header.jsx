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
    sessionStorage.clear();
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
          {isLogin ? (
            <>
              <li>님 환영합니다.</li>
              <li onClick={() => clickLogout()}>로그아웃</li>
            </>
          ) : (
            <>
              <li onClick={() => navigate("/login")}>로그인</li>
              <li onClick={() => navigate("/register")}>회원가입</li>
            </>
          )}
        </ul>
      </div>
      <Nav isLogin={isLogin} />
    </HeaderComp>
  );
}
