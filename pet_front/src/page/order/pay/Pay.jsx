import PayComp from './PayStyle';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Popup from './Popup';
import OrderApi from '../../../api/OrderApi';
import MemberApi from '../../../api/MemberApi';

export default function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상태변수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const seller = process.env.PUBLIC_URL + '/images/avatar.png';
  const [goods, setGoods] = useState([]);
  const [payment, setPayment] = useState(); // 결제수단

  // 회원정보 & 주소정보
  const [member, setMember] = useState({});
  const [addr, setAddr] = useState('');
  const [addrId, setAddrId] = useState('');
  const [addrName, setAddrName] = useState('');
  const [addrType, setAddrType] = useState('');

  // 금액 관련
  const [goodsPrice, setGoodsPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [disCount, setDisCount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [grade, setGrade] = useState(0);

  // 수량
  const rawGoods = location.state?.goods;
  const goodsList = Array.isArray(rawGoods) ? rawGoods : rawGoods ? [rawGoods] : []; // 단일 상품이 오더라도 강제로 배열로 감싸기

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 팝 업 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~ 모달 사용 (연락처 변경) ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [phone, setPhone] = useState('');

  // 연락처 유효성 검사
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  // 팝업 Open / Close
  const handlePhoneSave = () => {
    console.log('수정된 연락처:', phone);
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(phone)) {
      alert('유효한 연락처를 입력해주세요. (예: 01012345678)');
      return;
    }
    setIsPhoneOpen(false); // 팝업창 닫음
  };

  // 연락처 변경 창
  const handleOpenPopupPhone = () => {
    return (
      <Popup isOpen={isPhoneOpen} onClose={() => setIsPhoneOpen(false)}>
        <h3>연락처 변경</h3>
        <textarea value={phone} onChange={(e) => setPhone(e.target.value)} rows={4} style={{ width: '100%' }} />
        <br />
        <button onClick={handlePhoneSave}>저장</button>
      </Popup>
    );
  };

  // ~~~~~~~~~~~~~~~~~~~~~~ 모달 사용 (요청메시지 변경) ~~~~~~~~~~~~~~~~~~~~~~~
  const [isReqOpen, setIsReqOpen] = useState(false); // 배송요청사항 Open / Close
  const [note, setNote] = useState(''); // 배송요청 메시지

  // 팝업 Open / Close
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

  // ~~~~~~~~~~~~~~~~~~ 모달 사용 (배송지 수정) ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isDestOpen, setIsDestOpen] = useState(false); // 배송지지 Open / Close
  const [addrList, setAddrList] = useState([]); //배송지 목록

  //배송지 목록 호출하는 API
  const getAddrList = async () => {
    const response = await MemberApi.addrList();
    console.log(`Array.isArray(response) = ${Array.isArray(response)}`); // false라면 .data 확인
    setAddrList(response);
  };

  // 팝업 Open / Close
  const handleDestSave = () => {
    console.log('요청사항 저장:', note);
    setIsDestOpen(false); // 팝업창 닫음
  };

  // 배송지 목록 팝업 오픈시 배송지 전체조회 수행
  useEffect(() => {
    if (isDestOpen) {
      getAddrList();
    }
  }, [isDestOpen]);

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
  // 결제 로직 수행(BackEnd)
  const pay = async (goods, payment, addrName, note, addrId, phone) => {
    const payload = {
      goodsList: goods,
      payment: payment,
      deliveryName: addrName,
      requestMessage: note,
      addressId: addrId,
      recipientPhone: phone,
    };
    // alert("pay 동작테스트");
    OrderApi.pay(payload) // 여기가 호출
      .then((response) => {
        alert('결제가 성공적으로 마무리 되었습니다.');
        conditionCheck();
        navigate('/user/mypage/orderlist');
      })
      .catch((err) => {
        alert('OrderApi.pay() 에러');
      });

    //주문이 성공한 이후에 등급 업그레이드 조건이 충족 되었는지 검사하는 API 호출
  };

  //업그레이드 검사
  const conditionCheck = async () => {
    const result = await MemberApi.conditionCheck();

    //만약 업그레이드 조건이 중족됐다면 이동
    if (result.success) {
      navigate('/upgrade', { state: { nextGrade: result.data } });
    }
  };

  // 걸제수단 핸들링 & 유효성 검사
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~ useEffect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 새로고침 방지
  useEffect(() => {
    if (!addrId || addrList.length === 0) return;
    // addrId가 바뀌었을 때, addrList에서 찾아서 주소정보 반영
    const selected = addrList.find((a) => a.addressId === addrId);
    if (selected) {
      setAddr(`${selected.address1} ${selected.address2}`);
      setAddrName(selected.addressName);
      setAddrType(selected.addrType);
    }
  }, [addrId, addrList]);

  // 기본정보
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 사용자 정보
    MemberApi.detail()
      .then((response) => {
        setMember(response);
        setPhone(response.phone);
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

    // 상품 정보
    if (goodsList.length > 0) {
      setGoods(goodsList);
    }
    console.log('goodsList:', goodsList);
  }, []);

  // 비동기 문제 : member의 grade 불러온 후 그에 따른 할인율 적용
  useEffect(() => {
    if (!member.grade) return; // grade가 존재할 때만 실행
    // 등급별 할인율, 배달료, 최종결제금액 조회
    OrderApi.getPayPrice(goods)
      .then((response) => {
        setGoodsPrice(response.goodsPrice);
        setDeliveryPrice(response.deliveryPrice);
        setDisCount(response.disCount);
        setFinalPrice(response.finalPrice);
        setGrade(response.grade);
      })
      .catch((err) => {
        alert('OrderApi.pay() 에러');
      });
  }, [member, goods]);

  return (
    <PayComp>
      <div className='pay-container'>
        <section>
          <div className='title'>구매자 정보</div>
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
          <div className='title'>배송지 정보</div>
          <hr />
          <table>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{member.name}</td>
              </tr>
              <tr>
                <th>배송지</th>
                <td>
                  <b>{addrType}</b> &nbsp;&nbsp;&nbsp;
                  <button onClick={() => setIsDestOpen(true)} className='deliver-btn'>
                    배송지 수정
                  </button>
                  <br />
                  {addr}
                  {isDestOpen && (
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
                              <div className='addr_btn'>
                                <button
                                  onClick={() => {
                                    setAddrId(a.addressId);
                                    setAddrName(a.addressName);
                                    setAddr(`${a.address1} ${a.address2}`);
                                    setAddrType(a.addrType);
                                    // 새로고침 방어
                                    sessionStorage.setItem('selectedAddress', JSON.stringify(a));
                                    setIsDestOpen(false);
                                  }}>
                                  선택
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <button onClick={handleDestSave}>저장</button>
                    </Popup>
                  )}
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>
                  {phone || member.phone}
                  &nbsp;&nbsp;
                  <button onClick={() => setIsPhoneOpen(true)} className='contact-btn'>
                    연락처수정
                  </button>
                  {isPhoneOpen && handleOpenPopupPhone()}
                </td>
              </tr>
              <tr>
                <th>요청메시지</th>
                <td>
                  {note || '배송 요청사항을 입력해주세요.'}
                  &nbsp;&nbsp;
                  <button onClick={() => setIsReqOpen(true)} className='message-btn'>
                    수정
                  </button>
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

          <div className='goods'>
            {goods.map((item, index) => (
              <div className='prod' key={index}>
                <div className='prodleft'>
                  <img src={`${item.imageFile}`} alt={item.goodsName} className='prodimg' onClick={() => navigate('/goods/order', { state: { goods: item } })} />
                </div>
                <div className='prodright'>
                  <div>
                    <b>상품명</b>&nbsp;&nbsp;{item.goodsName}
                  </div>
                  <div>
                    <b>상세정보</b>&nbsp;&nbsp;{item.description}
                  </div>
                  <div>
                    <b>가격</b>&nbsp;&nbsp; {item.price} 원
                  </div>
                  <div>
                    <b>구매 수량 </b>&nbsp;&nbsp; &nbsp;&nbsp;
                    <b> {item.quantity}</b>&nbsp;&nbsp;
                  </div>
                  <div>
                    <b>판매원</b>&nbsp;&nbsp;
                    <img src={seller} className='seller' alt='판매원' /> 몽냥마켓
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <br />
        <section>
          <div className='title'>결제 정보</div>
          <hr />
          <table>
            <tbody>
              <tr>
                <th>상품 가격</th>
                <td>
                  <b>{goodsPrice} 원</b>
                </td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>
                  <b>{deliveryPrice} 원 </b>
                </td>
              </tr>
              <tr>
                <th>할인금액</th>
                {grade === '새싹회원' ? (
                  <td></td>
                ) : (
                  <td style={{ color: 'red' }}>
                    <b>- {disCount} 원</b>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ fontSize: '10px' }}> 회원님의 등급은 {grade} 입니다. </span>
                  </td>
                )}
              </tr>
              <tr>
                <th>최종결제금액</th>
                <td>
                  <b>{finalPrice} 원 </b>
                </td>
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
                    <input type='radio' name='payment' value='NOACCOUNT' checked={payment === 'NOACCOUNT'} onChange={handlePaymentChange} /> 무통장입금(상세조회) <br />
                  </label>
                </td>
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
              pay(goods, payment, addrName, note, addrId, phone);
            }}>
            결제하기
          </button>
          &nbsp;&nbsp; <button className='cancel'>메인 페이지로</button>
        </section>
      </div>
    </PayComp>
  );
}
