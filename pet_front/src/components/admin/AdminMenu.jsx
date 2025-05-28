import { useNavigate } from "react-router-dom";
import AdminMenuComp from "./AdminMenuStyle";

export default function AdminMenu() {
  const navigate = useNavigate();
  return (
    <AdminMenuComp>
      <div className="side_menu">
        <div className="sub_menu" id="user_menu">
          <p className="menu_title">회원 관리</p>
          <ul>
            <li>
              <span onClick={() => navigate("/myedit")}>
                회원 목록 및 상세 정보
              </span>
            </li>
            <li>
              <span onClick={() => navigate("/updatepw")}>회원 등급 관리</span>
            </li>
            <li>
              <span onClick={() => navigate("/updatepw")}>회원 상태 관리</span>
            </li>
            <li>
              <span onClick={() => navigate("/updatepw")}>고객 활동 기록</span>
            </li>
          </ul>
        </div>
        <div className="sub_menu" id="goods_menu">
          <p className="menu_title">상품 관리</p>
          <ul>
            <li>
              <span>상품 등록/수정/삭제</span>
            </li>
            <li>
              <span>상품 카테고리 관리</span>
            </li>
            <li>
              <span>옵션 및 재고 관리리</span>
            </li>
          </ul>
        </div>
        <div className="sub_menu" id="order_menu">
          <p className="menu_title">주문 관리리</p>
          <ul>
            <li>
              <span>전체 주문 목록</span>
            </li>
            <li>
              <span>주문 상세 및 상태 변경</span>
            </li>
            <li>
              <span>반품 처리</span>
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
    </AdminMenuComp>
  );
}
