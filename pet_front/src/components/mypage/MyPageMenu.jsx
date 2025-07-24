import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function MypageMenu() {
  const navigate = useNavigate();
  const MyPageMenuComp = styled.div`
    .side_menu {
      width: 250px;
      padding: 50px 10px;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(226, 220, 220);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      box-shadow: 1px 2px 4px rgb(204, 194, 194);

      .sub_menu {
        width: 150px;
        margin-top: 10px;
        background-color: #fff;
        display: flex;
        flex-direction: column;

        .menu_title {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          padding: 10px;
          color: rgb(88, 80, 80);
          border-top: 2px solid rgb(124, 110, 110);
        }
        ul {
          padding: 10px 15px;
          li {
            text-align: center;
            height: 20px;
            line-height: 20px;
            margin: 3px;

            span {
              font-size: 14px;
              cursor: pointer;
              font-weight: bold;
              color: rgb(92, 77, 77);
            }
            &:hover {
              font-weight: bold;
            }
          }
          li:hover {
            font-size: 1.05em;
            text-shadow: 1px 1px 1px rgb(122, 110, 110);
            color: rgb(88, 83, 83);
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
