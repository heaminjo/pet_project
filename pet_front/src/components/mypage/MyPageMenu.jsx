import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MypageMenu() {
  const navigate = useNavigate();
  const MyPageMenuComp = styled.div`
    .side_menu {
      width: 200px;
      padding: 15px 10px;
      background-color: rgb(255, 251, 195);
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 3px 3px 3px #ccc;
      .sub_menu {
        background-color: #fff;
        .menu_title {
          background-color: #f8e776;
          font-size: 17px;
          font-weight: bold;
          padding: 5px;
          color: rgb(86, 82, 57);
        }
        ul {
          padding: 10px;
          li {
            span {
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }
  `;
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
              <span onClick={() => navigate("/user/cart/list")}>장바구니</span>
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
