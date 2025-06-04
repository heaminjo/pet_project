import { useNavigate } from "react-router-dom";
import MyPageMenuComp from "./MyPageMenuStyle";

export default function MypageMenu() {
  const navigate = useNavigate();
  return (
    <MyPageMenuComp>
      <div className="side_menu">
        <div className="sub_menu" id="user_menu">
          <p className="menu_title">내 정보</p>
          <ul>
            <li>
              <span onClick={() => navigate("/user/myedit")}>회원 수정</span>
            </li>
            <li>
              <span onClick={() => navigate("/user/updatepw")}>
                비밀번호 변경
              </span>
            </li>
          </ul>
        </div>
        <div className="sub_menu" id="goods_menu">
          <p className="menu_title">상품</p>
          <ul>
            <li>
              <span>찜</span>
            </li>
            <li>
              <span>장바구니</span>
            </li>
            <li>
              <span>최근 본 목록</span>
            </li>
            <li>
              <span>내 후기</span>
            </li>
            <li>
              <span>배송지 관리</span>
            </li>
          </ul>
        </div>
        <div className="sub_menu" id="order_menu">
          <p className="menu_title">주문 / 배송</p>
          <ul>
            <li>
              <span>주문 / 배송 내역</span>
            </li>
            <li>
              <span>취소 내역</span>
            </li>
          </ul>
        </div>
        <div className="sub_menu" id="border_menu">
          <p className="menu_title">내 게시물</p>
          <ul>
            <li>
              <span>내 게시물 목록</span>
            </li>
            <li>
              <span>북마크</span>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    </MyPageMenuComp>
  );
}
