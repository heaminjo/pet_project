import PayComp from "./PayStyle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MemberApi from "../../../api/MemberApi";
import GoodsApi from "../../../api/GoodsApi";
import OrderApi from "../../../api/OrderApi";

export default function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상태변수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [goods, setGoods] = useState([]);
  const [requestNote, setRequestNote] = useState("");

  // 결제수단
  const [payment, setPayment] = useState();

  // 회원정보 & 주소정보
  const [member, setMember] = useState({});
  const [address, setAddress] = useState("");

  // 수정 버튼
  const [popup, setPopup] = useState(false);

  // 수량
  //const quantities = location.state?.quantity || [];

  // const goodsList = location.state?.goods || []; // Order -> Pay 이동위해 변경 (rawGoods 추가)
  const rawGoods = location.state?.goods;
  const goodsList = Array.isArray(rawGoods)
    ? rawGoods
    : rawGoods
    ? [rawGoods]
    : []; // 단일 상품이 오더라도 강제로 배열로 감싸기

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 로직 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleOpenPopup = () => {
    window.open();
  };

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
    alert("pay 동작테스트");
    OrderApi.pay(payload) // 여기가 호출
      .then((response) => {
        alert("GoodsApi.pay() 성공");
        navigate("/user/orderdetail");
      })
      .catch((err) => {
        alert("GoodsApi.pay() 에러");
      });
  };

  // 걸제수단 핸들링 & 유효성 검사
  const handlePaymentChange = (e) => {
    if (!payment) {
      alert("결제 수단을 선택해 주세요!");
      return;
    }
    setPayment(e.target.value);
    pay(goods, payment);
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
        alert("주소 조회 실패");
      });
    // 상품 정보
    if (goodsList.length > 0) {
      setGoods(goodsList);
    }
    console.log("goodsList:", goodsList);
  }, []);

  return (
    <PayComp>
      <div className="container">
        <section>
          <h2>구 매 자</h2>
          <hr />
          <div className="title">구매자</div>
          <table className="payment">
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
          <h2>배 송 지</h2> &nbsp;&nbsp;{" "}
          <button onClick={() => setPopup(true)}>배송지 수정</button>
          <hr />
          <div className="title">수령인</div>
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
                  문 앞(직접수령) &nbsp;&nbsp; <button>수정</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <br />
        <section>
          <h2>구 매 목 록</h2>
          <hr />
          <div className="title">상품정보</div>
          {goods.map((item, index) => (
            <div className="goodslist" key={index}>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {item.goodsName}
                {", "}
                {item.description}
                {", "}
                {item.quantity}
                {" 개"}
              </div>
            </div>
          ))}
        </section>
        <br />
        <section>
          <h2>결 제</h2>
          <hr />
          <div className="title">결제 정보</div>
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
                    <input
                      type="radio"
                      name="payment"
                      value="ACCOUNT"
                      checked={payment === "ACCOUNT"}
                      onChange={handlePaymentChange}
                    />{" "}
                    계좌이체 <br />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="POINT"
                      checked={payment === "POINT"}
                      onChange={handlePaymentChange}
                    />{" "}
                    포인트결제 &nbsp; &nbsp; &nbsp;
                    <span className="badge">최대 캐시적립</span> <br />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="CARD"
                      checked={payment === "CARD"}
                      onChange={handlePaymentChange}
                    />{" "}
                    신용/체크카드 <br />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="CORPCARD"
                      checked={payment === "CORPCARD"}
                      onChange={handlePaymentChange}
                    />{" "}
                    법인카드 <br />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="PHONE"
                      checked={payment === "PHONE"}
                      onChange={handlePaymentChange}
                    />{" "}
                    휴대폰 <br />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="NOACOUNT"
                      checked={payment === "NOACOUNT"}
                      onChange={handlePaymentChange}
                    />{" "}
                    무통장입금(상세조회) <br />
                  </label>
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{member.phone}</td>
              </tr>
              <tr>
                <th>요청사항</th>
                <td>문 앞(직접수령)</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <button
            className="pay"
            onClick={() => {
              pay(goods, payment);
            }}
          >
            결제하기
          </button>
          &nbsp;&nbsp; <button className="cancel">메인 페이지로</button>
        </section>
      </div>
    </PayComp>
  );
}
