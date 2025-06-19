import PayComp from './PayStyle';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MemberApi from '../../../api/MemberApi';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import Popup from './Popup';

export default function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상태변수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [goods, setGoods] = useState([]);
  const [payment, setPayment] = useState(); // 결제수단
  // 회원정보 & 주소정보
  const [member, setMember] = useState({});
  const [address, setAddress] = useState('');

  // 수량
  //const quantities = location.state?.quantity || [];

  // const goodsList = location.state?.goods || []; // Order -> Pay 이동위해 변경 (rawGoods 추가)
  const rawGoods = location.state?.goods;
  const goodsList = Array.isArray(rawGoods) ? rawGoods : rawGoods ? [rawGoods] : []; // 단일 상품이 오더라도 강제로 배열로 감싸기

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 팝 업 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 모달 사용 (요청사항) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isReqOpen, setIsReqOpen] = useState(false); // 배송요청사항 Open / Close
  const [note, setNote] = useState(''); // 배송요청 메시지

  // 요청사항 저장
  const handleReqSave = () => {
    console.log('요청사항 저장:', note);
    setIsReqOpen(false); // 팝업창 닫음
  };

  // 요청사항 입력 창
  const handleOpenPopupReq = () => {
    return (
      <Popup isOpen={isReqOpen} onClose={() => setIsReqOpen(false)}>
        <h3>요청사항 입력</h3>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} style={{ width: '100%' }} />
        <br />
        <button onClick={handleReqSave}>저장</button>
      </Popup>
    );
  };

  // 모달 사용 (배송지 수정) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isDestOpen, setIsDestOpen] = useState(false); // 배송지지 Open / Close
  const [addrList, setAddrList] = useState([]); //배송지 목록

  //배송지 목록 호출하는 API
  const getAddrList = async () => {
    const result = await MemberApi.addrList();
    setAddrList(result);
  };

  // 배송지 상태
  const handleDestSave = () => {
    console.log('요청사항 저장:', note);
    setIsDestOpen(false); // 팝업창 닫음
  };

  // 배송지 수정 창
  const handleOpenPopupDestination = () => {
    getAddrList();
    return (
      <Popup isOpen={isDestOpen} onClose={() => setIsDestOpen(false)}>
        <h3>배송지 변경 창</h3>
        <br />
        {addrList.length > 0 && (
          <ul className='addr'>
            {addrList.map((a, index) => (
              <li>
                <div className='addr_item'>
                  <div className='addr1'>
                    {index == 0 ? <p style={{ fontWeight: 'bold' }}>{a.addrType}</p> : <p>{a.addrType}</p>}
                    <span>{a.addressName}</span>
                  </div>

                  <div className='addr2'>
                    <p>[우편번호]{a.addressZip}</p>
                    <span>
                      {a.address1} {a.address2}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleDestSave}>저장</button>
      </Popup>
    );
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결 제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 총 구매가격
  const totalPrice = goodsList.reduce((acc, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);
  // 배달료
  const deliverPrice = 3000;

  // 결제 로직 수행(BackEnd)
  const pay = async (goods, payment) => {
    const payload = {
      goodsList: goods,
      payment: payment,
    };
    alert('pay 동작테스트');
    OrderApi.pay(payload) // 여기가 호출
      .then((response) => {
        alert('GoodsApi.pay() 성공');
        navigate('/user/mypage/orderlist');
      })
      .catch((err) => {
        alert('GoodsApi.pay() 에러');
      });
  };

  // 걸제수단 핸들링 & 유효성 검사
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  useEffect(() => {
    // 사용자 정보
    MemberApi.detail()
      .then((response) => {
        setMember(response);
      })
      .catch((err) => {});
    // 사용자 주소
    OrderApi.findAddress()
      .then((response) => {
        setAddress(response);
      })
      .catch((err) => {
        alert('주소 조회 실패');
      });
    // 상품 정보
    if (goodsList.length > 0) {
      setGoods(goodsList);
    }
    console.log('goodsList:', goodsList);
  }, []);

  return (
    <PayComp>
      <div className='container'>
        <section>
          <div className='title'>구매자</div>
          <hr />
          <table className='payment'>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{member.name}</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>{member.email}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{member.phone}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <br />
        <section>
          <div className='title'>
            배송지 정보 &nbsp;&nbsp;&nbsp;<button onClick={() => setIsDestOpen(true)}>배송지 수정</button>
            {isDestOpen && handleOpenPopupDestination()}
          </div>
          <hr />
          <table>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{member.name}</td>
              </tr>
              <tr>
                <th>배송지</th>
                <td>{address}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{member.phone}</td>
              </tr>
              <tr>
                <th>요청사항</th>
                <td>
                  {note || '배송 요청사항을 입력해주세요.'}
                  &nbsp;&nbsp;
                  <button onClick={() => setIsReqOpen(true)}>수정</button>
                  {isReqOpen && handleOpenPopupReq()}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <br />
        <section>
          <div className='title'>상품 정보</div>
          <hr />
          {goods.map((item, index) => (
            <div className='goodslist' key={index}>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {item.goodsName}
                {', '}
                {item.description}
                {', '}
                {item.quantity}
                {' 개'}
              </div>
            </div>
          ))}
        </section>
        <br />
        <section>
          <div className='title'>결제 정보</div>
          <hr />
          <table>
            <tbody>
              <tr>
                <th>상품 가격</th>
                <td>{totalPrice} 원</td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>{deliverPrice} 원</td>
              </tr>
              <tr>
                <th>최종결제금액</th>
                <td>{totalPrice + deliverPrice} 원</td>
              </tr>
              <tr>
                <th>결제방법</th>
                <td>
                  <label>
                    <input type='radio' name='payment' value='ACCOUNT' checked={payment === 'ACCOUNT'} onChange={handlePaymentChange} /> 계좌이체 <br />
                  </label>
                  <label>
                    <input type='radio' name='payment' value='POINT' checked={payment === 'POINT'} onChange={handlePaymentChange} /> 포인트결제 &nbsp; &nbsp; &nbsp;
                    <span className='badge'>최대 캐시적립</span> <br />
                  </label>
                  <label>
                    <input type='radio' name='payment' value='CARD' checked={payment === 'CARD'} onChange={handlePaymentChange} /> 신용/체크카드 <br />
                  </label>
                  <label>
                    <input type='radio' name='payment' value='CORPCARD' checked={payment === 'CORPCARD'} onChange={handlePaymentChange} /> 법인카드 <br />
                  </label>
                  <label>
                    <input type='radio' name='payment' value='PHONE' checked={payment === 'PHONE'} onChange={handlePaymentChange} /> 휴대폰 <br />
                  </label>
                  <label>
                    <input type='radio' name='payment' value='NOACOUNT' checked={payment === 'NOACOUNT'} onChange={handlePaymentChange} /> 무통장입금(상세조회) <br />
                  </label>
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{member.phone}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <button
            className='pay'
            onClick={() => {
              if (!payment) {
                alert('결제 수단을 선택해 주세요!');
                return;
              }
              pay(goods, payment);
            }}>
            결제하기
          </button>
          &nbsp;&nbsp; <button className='cancel'>메인 페이지로</button>
        </section>
      </div>
    </PayComp>
  );
}
