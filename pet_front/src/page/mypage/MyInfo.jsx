import { Navigate, useOutlet, useOutletContext } from "react-router-dom";
import MyInfoComp from "./MyInfoStyle";
import { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";

export default function MyInfo() {
  const [user, setUser] = useState([]);
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
      localStorage.clear();
    }
  };
  return (
    <MyInfoComp>
      <div className="main_container">
        <div className="user_info">
          <div className="user_profile">
            {/* 프로필 이미지 ,이름, 이메일 ,  */}
            <div className="image">
              <img src={user.imageFile} alt="" />
            </div>
            <div className="data">
              <p className="user_name">
                <span>{user.name}</span>님
              </p>
              <p className="user_email">{user.email}</p>
            </div>
            <div className="point">
              <div className="point_name">
                <span>멍코인</span>
              </div>
              <div className="print_point">
                <span>{user.point}</span>
              </div>
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
              <p className="grade_name">{user.grade}</p>
              <p>등급 ▶</p>
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
    </MyInfoComp>
  );
}
