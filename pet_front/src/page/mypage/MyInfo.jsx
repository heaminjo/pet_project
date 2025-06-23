import {
  Navigate,
  useLocation,
  useNavigate,
  useOutlet,
  useOutletContext,
} from "react-router-dom";
import MyInfoComp from "./MyInfoStyle";
import React, { useContext, useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import gradeImage from "../../images/d1nrwjnej10dkwnrnksj423kj.jpg";
import { PetContext } from "./MyPage";
import { PiShoppingCartFill } from "react-icons/pi";
import { LuMoveRight } from "react-icons/lu";
import { TbHandFingerRight } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export default function MyInfo() {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const location = useLocation();
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getOrderList();
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
        console.log(result);
      }
    } catch (e) {
      navigate("/error", { state: { message: "권한이 없는 페이지 입니다." } });
    }
  };
  //최근 주문 목록 리스트
  const getOrderList = async () => {
    const result = await MemberApi.getOrderList();
    console.log(result);

    setOrderList(result);
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
              <img src={gradeImage} alt="" />
            </div>
            <div className="grade_text">
              <p className="grade_name">{user.grade}</p>
              <p
                onClick={() => navigate("/user/mypage/mygrade")}
                className="grade_detail"
              >
                내 등급 자세히 ▶
              </p>
            </div>
          </div>
        </div>
        {user.cartCount > 0 && (
          <div className="cart_">
            <i>{user.cartCount}개의 상품이 장바구니에서 기다리고있어요~</i>
            <div
              className="cart_icon"
              onClick={() => navigate("/user/mypage/cart/list")}
            >
              <PiShoppingCartFill />
              <LuMoveRight />
            </div>
          </div>
        )}
      </div>
      <div className="order_">
        <h2>
          주문 목록 <span>최근 주문 3건</span>
        </h2>
        <hr />
        <div className="order_list">
          {orderList.length > 0 ? (
            <ul>
              {orderList.map((o) => (
                <li>
                  <div className="order_title">
                    <h4>{o.regDate}</h4>
                    <h4>{o.status}</h4>
                  </div>
                  <h3></h3>
                  <div className="order_data">
                    <div className="image_">
                      <img src={o.imageFile} alt="상품 이미지" />
                    </div>
                    <div className="text_">
                      <p>
                        {o.goodsName} <span>외 {o.totalGoods - 1}개</span>
                      </p>
                      <p>{o.totalPrice} 원</p>
                      <div className="detail">
                        <span>상세보기</span>
                        <TbHandFingerRight />
                      </div>
                    </div>
                    <div className="menu_">
                      <button>배송 조회</button>
                      <button>장바구니 담기</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="not_goods">
              <MdOutlineProductionQuantityLimits />
              <p>아직 주문한 상품이 없습니다.</p>
              <button onClick={() => navigate("/goods/list")}>
                상품 보러가기{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </MyInfoComp>
  );
}
