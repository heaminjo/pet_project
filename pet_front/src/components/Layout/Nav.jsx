import { useNavigate } from "react-router-dom";
import NavComp from "./NavStyle";
import { PetContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BiSolidShoppingBag } from "react-icons/bi";
import { MdGrade } from "react-icons/md";
import { LuClipboardPenLine } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

export default function Nav() {
  const navigate = useNavigate();

  //로그인 체크
  //비 로그인 시 로그인 화면으로 이동동

  const clickMyPage = () => {
    if (sessionStorage.getItem("role") == "ROLE_ADMIN") {
      navigate("/admin/page/statistics");
    } else if (sessionStorage.getItem("loginName") != null) {
      navigate("/user/mypage/myinfo");
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  };
  return (
    <NavComp>
      <div className="nav_inner">
        <ul className="nav_menu">
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
    </NavComp>
  );
}
