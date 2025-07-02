import { useNavigate } from "react-router-dom";
import HeaderComp from "./Headerstyle";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { PetContext } from "../../App";
import MemberApi from "../../api/MemberApi";
import { IoMdMenu } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { IoLogOutSharp } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();
  const [role, setRole] = useState(sessionStorage.getItem("role"));
  const [menu, setMenu] = useState(false);
  //로그아웃 클릭
  const clickLogout = async () => {
    await MemberApi.logout();
    sessionStorage.clear();
    alert("로그아웃 됩니다.");
    navigate("/");
  };

  const userMenu = () => {
    if (sessionStorage.getItem("loginName") != null) {
      navigate("/user/mypage/myinfo");
    } else {
      navigate("/login");
    }
  };
  return (
    <HeaderComp>
      <div className="header_inner">
        <div className="header_title">
          <h1 onClick={() => navigate("/")}>몽냥마켓</h1>
        </div>

        <ul className="member_menu">
          {sessionStorage.getItem("loginName") != null ? (
            <>
              <li className="max_sign">
                <span>{sessionStorage.getItem("loginName")}님 환영합니다</span>
                <span onClick={() => clickLogout()}>로그아웃</span>
              </li>
              <li className="min_sign">
                <span onClick={() => navigate("/user/mypage/myinfo")}>
                  <BsPersonFill />
                </span>
                <span onClick={() => clickLogout()}>
                  <IoLogOutSharp />
                </span>
                <span>
                  <IoMdMenu onClick={() => setMenu(true)} />
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="max_sign">
                <span onClick={() => navigate("/login")}>로그인</span>
                <span onClick={() => navigate("/join")}>회원가입</span>
              </li>
              <li className="min_sign">
                <span onClick={() => userMenu()}>
                  <BsPersonFill />
                </span>
                <span>
                  <IoMdMenu onClick={() => setMenu(true)} />
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
      <Nav menu={menu} setMenu={setMenu} />
    </HeaderComp>
  );
}
