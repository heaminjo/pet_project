import { useEffect } from "react";
import MemberApi from "../../api/MemberApi";
import MyPageComp from "./MyPageStyle";
import MypageMenu from "../../components/MyPageMenu";

export default function MyPage() {
  useEffect(() => {
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    const result = MemberApi.detail();
    console.log(result);
  };
  return (
    <MyPageComp>
      <div className="mypage_inner">
        <MypageMenu />
        <div className="main_container">
          <div className="user_info">
            <div className="user_profile">
              {/* 프로필 이미지 ,이름, 이메일 ,  */}
              <div className="image">
                <img
                  src="https://images.mypetlife.co.kr/content/uploads/2023/01/13160523/AdobeStock_405843911-scaled.jpeg"
                  alt=""
                />
              </div>
              <div className="data">
                <h3>[회원정보]님</h3>
              </div>
            </div>
            <div className="user_grade">
              {/* 등급별 이미지,등급 */}
              <div className="grade_image">
                <img
                  src="https://th.bing.com/th/id/OIP.BMhVnqzc_evd72p3eiropAHaHa?w=698&h=698&rs=1&pid=ImgDetMain"
                  alt=""
                />
              </div>
              <div className="grade_text">
                <p>새싹 등급</p>
                <p>등급표 알아보기</p>
              </div>
            </div>
          </div>
          <div className="order_state">
            <ul>
              <li>
                <big>최근 주문 내역</big>
                <span>0</span>
              </li>
              <li>
                <big>현재 배송중</big>
                <span>2</span>
              </li>
              <li>
                <big>배송 완료</big>
                <span>0</span>
              </li>
              <li>
                <big>장바구니</big>
                <span>0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MyPageComp>
  );
}
