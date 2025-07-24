import { useEffect, useState } from 'react';
import MemberApi from '../../../api/MemberApi';
import DeliveryComp from './DeliveryStyle';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import { useLocation } from 'react-router-dom';
// import './delivery.css';

export default function Delivery() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const location = useLocation();

  const deliverImg = process.env.PUBLIC_URL + '/images/delivery.png';
  const [member, setMember] = useState([]);
  const [goods, setGoods] = useState([]);
  const [addr, setAddr] = useState('');
  const [addrId, setAddrId] = useState('');
  const [addrName, setAddrName] = useState('');
  const [addrType, setAddrType] = useState('');

  const query = new URLSearchParams(location.search);
  const goodsId = query.get('goodsId');
  const [delivery, setDelivery] = useState([]);
  const orderDetailId = query.get('orderDetailId');

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

  // 배송상태 가져오기
  const deliveryStatus = async (orderDetailId) => {
    const payload = {
      memberId: '',
      goodsId: '',
      orderId: '',
      quantity: '',
      reason: '',
      returnDate: '',
    };
    OrderApi.deliveryStatus(orderDetailId)
      .then((response) => {
        // ORDERSTATE.BEFOREPAY ....
        setDelivery(response);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    // alert(`goodsId => ${goodsId}`);
    memberInfo();
    if (goodsId) {
      goodsInfo(goodsId);
    }
    if (orderDetailId) {
      deliveryStatus(orderDetailId);
    }
  }, [goodsId, orderDetailId]);

  // 기본정보
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 사용자 정보
    MemberApi.detail()
      .then((response) => {
        setMember(response);
      })
      .catch((err) => {});

    // 사용자 주소
    OrderApi.findAddress()
      .then((response) => {
        if (response && response.addressId) {
          setAddrId(response.addressId);
          setAddr(response.address1 + ' ' + response.address2);
          // alert(`배송지주소: ${response.addressName}`);
          setAddrName(response.addressName);
          setAddrType(response.addrType);
          console.log(`최초호출 OrderApi.findAddress() 결과 response.addressName = ${response.addressName}`);
        }
      })
      .catch((err) => {
        // alert("주소 조회 실패");
      });
  }, []);

  return (
    <DeliveryComp>
      <div className='container'>
        <div className='title'>배송조회</div>
        <div className='box1'>
          {delivery === 'AFTERPAY' ? (
            <>
              결제완료
              <br />
              판매자가 주문을 확인 중입니다.
            </>
          ) : delivery === 'READY' ? (
            <>
              상품준비중
              <br />
              판매자가 상품을 준비 중입니다.
            </>
          ) : delivery === 'DELIVERY' ? (
            <>
              배송중
              <br />
              배송이 시작되었습니다.
            </>
          ) : delivery === 'END' ? (
            <>
              배송완료
              <br />
              해당 상품의 배송이 완료되었습니다.
            </>
          ) : (
            ''
          )}
          {/*ㄴ orders 테이블의 regDate 가져옴 (order response dto 활용) */}
        </div>
        <div className='infotitle'>배송정보</div>
        <div className='info'>
          <section className='deliver'>
            <img src={deliverImg} alt='' className='deliverimg' />
            {delivery === 'DELIVERY' ? (
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
            ) : (
              <table className='deliverinfo'>
                <tr>
                  <td>택배사</td>
                  <td></td>
                </tr>
                <tr>
                  <td>전화번호</td>
                  <td></td>
                </tr>
                <tr>
                  <td>송장번호</td>
                  <td></td>
                </tr>
                <tr>
                  <td>판매자</td>
                  <td>몽냥마켓</td>
                </tr>
              </table>
            )}
          </section>
          <section className='user'>
            <table className='userinfo'>
              <tr>
                <td>받는사람</td>
                <td>{member.name}</td>
              </tr>
              <tr>
                <td>받는주소</td>
                <td>{member.addressName || '경기 성남시 분당구'}</td>
              </tr>
              <tr>
                <td>요청사항</td>
                <td>문 앞</td>
              </tr>
            </table>
          </section>
        </div>
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
