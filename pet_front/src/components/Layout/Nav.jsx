import { useNavigate } from "react-router-dom";
import NavComp from "./NavStyle";
import { PetContext } from "../../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidShoppingBag } from "react-icons/bi";
import { MdGrade } from "react-icons/md";
import { LuClipboardPenLine } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMdClose, IoMdHome } from "react-icons/io";
import React from "react";

export default function Nav({ menu, setMenu }) {
  const navigate = useNavigate();

  //로그인 체크
  //비 로그인 시 로그인 화면으로 이동동

  const clickMyPage = () => {
    setMenu(false);
    if (sessionStorage.getItem("role") == "ROLE_ADMIN") {
      navigate("/admin/page/statistics");
    } else if (sessionStorage.getItem("loginName") != null) {
      navigate("/user/mypage/myinfo");
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  };

  const move = (url) => {
    setMenu(false);
    navigate(url);
  };
  return (
    <NavComp>
      <div className="max_nav">
        <div className="nav_inner">
          <ul className="nav_menu">
            <li onClick={() => navigate("/")}>
              <span> 홈</span>
              <IoMdHome />
            </li>
            <li onClick={() => navigate("/goods/list")}>
              <span> 펫스토어</span>
              <BiSolidShoppingBag />
            </li>
            <li onClick={() => navigate("/grade")}>
              <span>등급별 혜택</span>
              <MdGrade />
            </li>

            <li onClick={() => navigate("/boardList/free")}>
              <span> 게시판</span>
              <LuClipboardPenLine />
            </li>

            {sessionStorage.getItem("role") == "ROLE_ADMIN" ? (
              <li onClick={() => clickMyPage()}>
                <span> 관리자페이지</span>
                <RiAdminFill />
              </li>
            ) : (
              <li onClick={() => clickMyPage()}>
                <span> 마이페이지</span>
                <FaUserAlt />
              </li>
            )}
          </ul>
        </div>
      </div>
      {menu && (
        <React.Fragment>
          <div className="min_nav">
            <div className="nav_btn">
              <span onClick={() => setMenu(false)}>
                <IoMdClose />
              </span>
            </div>
            <ul className="nav_menu">
              <li onClick={() => move("/")}>
                <span> 홈</span>
              </li>
              <li onClick={() => move("/goods/list")}>
                <span> 펫스토어</span>
              </li>
              <li onClick={() => move("/grade")}>
                <span>등급별 혜택</span>
              </li>

              <li onClick={() => move("/boardList/free")}>
                <span> 게시판</span>
              </li>

              {sessionStorage.getItem("role") == "ROLE_ADMIN" ? (
                <li
                  onClick={() => {
                    clickMyPage();
                  }}
                >
                  <span> 관리자페이지</span>
                </li>
              ) : (
                <li
                  onClick={() => {
                    clickMyPage();
                  }}
                >
                  <span> 마이페이지</span>
                </li>
              )}
            </ul>
          </div>
        </React.Fragment>
      )}
    </NavComp>
  );
}
