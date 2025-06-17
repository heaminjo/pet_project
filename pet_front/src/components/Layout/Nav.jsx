import { useNavigate } from "react-router-dom";
import NavComp from "./NavStyle";
import { PetContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  //로그인 체크
  //비 로그인 시 로그인 화면으로 이동동
  const loginCheck = (move) => {
    if (localStorage.getItem("loginName") == null) {
      navigate(move);
    } else {
      alert("로그인이 필요한 서비스입니다");
      navigate("/login");
    }
  };
  const clickMyPage = () => {
    if (localStorage.getItem("loginName") != null) {
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
          <li style={{ color: "red" }} onClick={() => navigate("/goods/list")}>
            전체 상품보기
          </li>
          <li onClick={() => navigate("/grade")}> 등급</li>

          <li onClick={() => navigate("/boardList/free")}>게시판</li>
          <li onClick={() => clickMyPage()}>마이페이지</li>

          {/* <li><Link to="/boardList">게시판</Link></li> */}
        </ul>
      </div>
    </NavComp>
  );
}
