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
      localStorage.clear();
      alert(e.response.data.message);
      navigate("/login");
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
