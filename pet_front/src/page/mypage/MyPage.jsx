import { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import MyPageComp from "./MyPageStyle";
import MypageMenu from "../../components/mypage/MyPageMenu";
import { Outlet, useNavigate } from "react-router-dom";

export default function MyPage() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    try {
      const result = await MemberApi.detail();
      setUser(result);
      console.log(result);
    } catch (e) {
      //401 에러 시 로그아웃 처리리

      navigate("/error", { state: { message: "권한이 없는 페이지 입니다." } });
    }
  };
  return (
    <MyPageComp>
      <div className="mypage_inner">
        <MypageMenu setModal={setModal} />
        <Outlet context={{ user }} />
      </div>
    </MyPageComp>
  );
}
