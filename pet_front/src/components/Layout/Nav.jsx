import { useNavigate } from "react-router-dom";
import NavComp from "./NavStyle";
import { PetContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

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
          <li onClick={() => navigate("/goods/list")}>쇼핑</li>
          <li onClick={() => navigate("/grade")}> 등급</li>

          <li onClick={() => navigate("/boardList/free")}>게시판</li>

          {sessionStorage.getItem("role") == "ROLE_ADMIN" ? (
            <li onClick={() => clickMyPage()}>관리자페이지</li>
          ) : (
            <li onClick={() => clickMyPage()}>마이페이지</li>
          )}
        </ul>
      </div>
    </NavComp>
  );
}
