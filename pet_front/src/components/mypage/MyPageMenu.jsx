import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function MypageMenu() {
  const navigate = useNavigate();
  const MyPageMenuComp = styled.div`
    .side_menu {
      width: 250px;
      padding: 15px 10px;
      background-color: #e1e1e1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 3px 3px 3px #ccc;
      .sub_menu {
        background-color: #fff;
        .menu_title {
          background-color: #a89e9a;
          font-size: 17px;
          font-weight: bold;
          padding: 5px;
          color: rgb(69, 66, 47);
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
      <div className='side_menu'>
        <div className='sub_menu' id='user_menu'>
          <p className='menu_title'>내 정보</p>
          <ul>
            <li>
              <span onClick={() => navigate('/user/mypage/myinfo')}>내 정보</span>
            </li>
            <li>
              <span onClick={() => navigate('/user/mypage/mygrade')}>내 등급</span>
            </li>
            <li>
              <span onClick={() => navigate('/user/mypage/myedit')}>회원 수정</span>
            </li>
            <li>
              <span onClick={() => navigate('/user/mypage/updatepw')}>비밀번호 변경</span>
            </li>
            <li>
              <span onClick={() => navigate('/user/mypage/withdrawal')}>회원 탈퇴</span>
            </li>
          </ul>
        </div>
        <div className='sub_menu' id='goods_menu'>
          <p className='menu_title'>상품</p>
          <ul>
            <li>
              <span onClick={() => navigate('/user/mypage/favorite')}>찜</span>
            </li>
            <li>
              <span onClick={() => navigate('/user/mypage/cart/list')}>장바구니</span>
            </li>

            <li>
              <span onClick={() => navigate('/user/mypage/myreview')}>내 후기</span>
            </li>
            <li>
              <span onClick={() => navigate('/user/mypage/addr')}>배송지 관리</span>
            </li>
          </ul>
        </div>
        <div className='sub_menu' id='order_menu'>
          <p className='menu_title'>주문 / 배송</p>
          <ul>
            <li>
              <span onClick={() => navigate('/user/mypage/orderlist')}>주문 / 배송 내역</span>
            </li>
            <li>
              <span onClick={() => navigate('/user/mypage/withdrawlist')}>취소 내역</span>
            </li>
          </ul>
        </div>
        <div className='sub_menu' id='border_menu'>
          <p className='menu_title'>내 게시물</p>
          <ul>
            <li>
              <span onClick={() => navigate('/user/mypage/myboardlist')}>내 게시물 목록</span>
            </li>
          </ul>
        </div>
      </div>
    </MyPageMenuComp>
  );
}
