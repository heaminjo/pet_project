import { useEffect, useState } from 'react';
import MemberApi from '../../../../api/MemberApi';
import DeliveryComp from './DeliveryStyle';
import GoodsApi from '../../../../api/GoodsApi';
import { useLocation } from 'react-router-dom';
// import './delivery.css';

export default function Delivery() {
  const location = useLocation();
  const deliverImg = process.env.PUBLIC_URL + '/images/delivery.png';
  const [member, setMember] = useState([]);
  const [goods, setGoods] = useState([]);
  const { goodsId } = location.state || {};
  const [delivery, setDelivery] = useState([]);

  // 회원정보 가져오기
  const memberInfo = async () => {
    MemberApi.detail()
      .then((response) => {
        setMember(response);
      })
      .catch((err) => {});
  };

  // <OrderDetail /> 등에서 goodsId 넘겨받아 배송현황 뿌리기.
  const goodsInfo = async (goodsId) => {
    GoodsApi.goodsDetail(goodsId)
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    alert(`goodsId => ${goodsId}`);
    memberInfo();
    if (goodsId) {
      goodsInfo(goodsId);
    }
  }, []);

  return (
    <DeliveryComp>
      <div className='container'>
        <div className='title'>배송조회</div>
        <div className='box1'>
          상품명: {goods.goodsName} <br />
          6/9(월) 배송 완료 <br />
          {/*ㄴ orders 테이블의 regDate 가져옴 (order response dto 활용) */}
        </div>

        <hr />
        <div className='infotitle'>배송정보</div>
        <div className='info'>
          <section className='deliver'>
            <img src={deliverImg} alt='' className='deliverimg' />
            <table className='deliverinfo'>
              <tr>
                <td>택배사</td>
                <td>CJ 대한통운</td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>1588-1255</td>
              </tr>
              <tr>
                <td>송장번호</td>
                <td>45646546</td>
              </tr>
              <tr>
                <td>판매자</td>
                <td>몽냥마켓</td>
              </tr>
            </table>
          </section>
          <hr />
          <section className='user'>
            <table className='userinfo'>
              <tr>
                <td>받는사람</td>
                <td>{member.name}</td>
              </tr>
              <tr>
                <td>받는주소</td>
                <td>{member.address || '경기 성남시 분당구'}</td>
              </tr>
              <tr>
                <td>요청사항</td>
                <td>문 앞</td>
              </tr>
            </table>
          </section>
        </div>
        <hr />
        <section className='desc'>
          <div className='title'>FAQ</div>
          <ul>
            <li className='faq'>[배송지] 배송 중에 배송지 및 배송요청사항을 변경할 수 있나요?</li>
            <li className='faq'>[배송일정] 주문한 상품은 언제 배송되나요?</li>
            <li className='faq'>[교환/반품] 상품을 교환/반품하고 싶어요.</li>
          </ul>
        </section>
      </div>
    </DeliveryComp>
  );
}
