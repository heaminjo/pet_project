import React, { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import MyPageComp from "./MyPageStyle";
import MypageMenu from "../../components/mypage/MyPageMenu";
import { Outlet, useNavigate } from "react-router-dom";
export const PetContext = React.createContext();

export default function MyPage() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getLoginUser();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getLoginUser = async () => {
    try {
      const result = await MemberApi.detail();
      if (result.memberState == "임시회원") {
        alert(
          "더 나은 서비스 이용을 위해 몇 가지 정보를 추가로 입력해 주세요."
        );
        navigate("/join", { state: { kakao: "임시" } });
      } else {
        setUser(result);
        console.log(result);
      }
    } catch (e) {
      navigate("/error", { state: { message: "권한이 없는 페이지 입니다." } });
    }
  };
  return (
    <PetContext.Provider value={{ user }}>
      <MyPageComp>
        <div className="mypage_inner">
          <MypageMenu setModal={setModal} />
          <Outlet context={{ user }} />
        </div>
      </MyPageComp>
    </PetContext.Provider>
  );
}
