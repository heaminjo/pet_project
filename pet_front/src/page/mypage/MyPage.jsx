import React, { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import MypageMenu from "../../components/mypage/MyPageMenu";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
        navigate("/join", { state: { kakao: "true" } });
      } else {
        setUser(result);
      }
    } catch (e) {
      navigate("/error", { state: { message: "권한이 없는 페이지 입니다." } });
    }
  };
  return (
    <PetContext.Provider value={{ user, setUser, getLoginUser }}>
      <MyPageComp>
        <div className="mypage_inner">
          <div className="menu_inner">
            <MypageMenu setModal={setModal} />
          </div>
          <div className="page_inner">
            <Outlet context={{ user }} />
          </div>
        </div>
      </MyPageComp>
    </PetContext.Provider>
  );
}
const MyPageComp = styled.div`
  width: 100%;
  margin-top: 150px;
  position: relative;
  .mypage_inner {
    max-width: "1920px";
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .menu_inner {
      width: 20%;
    }
    .page_inner {
      width: 80%;
    }
  }
`;
