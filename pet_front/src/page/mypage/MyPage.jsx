import { useEffect } from 'react';
import MemberApi from '../../api/MemberApi';
import MyPageComp from './MyPageStyle';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    const result = MemberApi.detail();
    console.log(result);
  };
  return (
    <MyPageComp>
      <div className='mypage_inner'>
        <div className='side_menu'>
          <div className='sub_menu' id='user_menu'>
            <p className='menu_title'>내 정보</p>
            <ul>
              <li>
                <span>회원 수정</span>
              </li>
              <li>
                <span>비밀번호 변경</span>
              </li>
            </ul>
          </div>
          <div className='sub_menu' id='goods_menu'>
            <p className='menu_title'>상품</p>
            <ul>
              <li>
                <span>찜</span>
              </li>
              <li>
                <span onClick={() => navigate('/cart/list')}>장바구니</span>
              </li>
              <li>
                <span>최근 본 목록</span>
              </li>
              <li>
                <span>내 후기</span>
              </li>
              <li>
                <span onClick={() => navigate('/delivery')}>배송지 관리</span>
              </li>
            </ul>
          </div>
          <div className='sub_menu' id='order_menu'>
            <p className='menu_title'>주문 / 배송</p>
            <ul>
              <li>
                <span onClick={() => navigate('/order')}>주문 내역</span>
              </li>
              <li>
                <span onClick={() => navigate('/delivery')}>배송 현황</span>
              </li>
              <li>
                <span onClick={() => navigate('/withdraw')}>취소 내역</span>
              </li>
            </ul>
          </div>
          <div className='sub_menu' id='border_menu'>
            <p className='menu_title'>내 게시물</p>
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
        <div className='main_container'>메인</div>
      </div>
    </MyPageComp>
  );
}
