import PayComp from './PayStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function Pay() {
  const [goods, setGoods] = useState([]);
  const [member, setMember] = useState([]);

  const pay = async () => {
    // const userName = localStorage.getItem('loginName');
    GoodsApi.pay()
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    pay(); // 호출
  }, []);

  return (
    <PayComp>
      <div className='container'>
        <section>
          <h2>상품정보</h2>
          <hr />
          <div className='title'>구매자 정보</div>
          <table>
            <tr>
              <th> 상품명</th>
              <td>고양이 사료, 1KG</td>
            </tr>
            <tr>
              <th>가격</th>
              <td>10000 원</td>
            </tr>
            <tr>
              <th>수량</th>
              <td>1개</td>
            </tr>
          </table>
        </section>
        <section>
          <h2>결제</h2>
          <hr />
          <div className='title'>구매자 정보</div>
          <table className='payment'>
            <tr>
              <th>이름</th>
              <td>정서영</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>@naver.com</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>010-0000-0000</td>
            </tr>
          </table>
        </section>
        <br />
        <br />
        <section>
          <div className='title'>
            수령인 정보&nbsp;&nbsp; <button>수정</button>
          </div>
          <table>
            <tr>
              <th>이름</th>
              <td>정서영</td>
            </tr>
            <tr>
              <th>배송지</th>
              <td>경기 성남시</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>010-0000-0000</td>
            </tr>
            <tr>
              <th>요청사항</th>
              <td>
                문 앞(직접수령) &nbsp;&nbsp; <button>수정</button>
              </td>
            </tr>
          </table>
        </section>
        <br />
        <br />
        <section>
          <div className='title'>결제 정보</div>
          <table>
            <tr>
              <th>상품 가격</th>
              <td> 12000 원</td>
            </tr>
            <tr>
              <th>배송비</th>
              <td>3000 원</td>
            </tr>
            <tr>
              <th>최종결제금액</th>
              <td>15000 원</td>
            </tr>
            <tr>
              <th>결제방법</th>
              <td>
                <input type='radio' name='payment' value='account' /> 계좌이체 <br />
                <input type='radio' name='payment' value='kpay' /> 머니 &nbsp; &nbsp; &nbsp;
                <span class='badge'>최대 캐시적립</span> <br />
                <input type='radio' name='payment' value='card' checked /> 신용/체크카드 <br />
                <input type='radio' name='payment' value='corp' /> 법인카드 <br />
                <input type='radio' name='payment' value='phone' /> 휴대폰 <br />
                <input type='radio' name='payment' value='transfer' /> 무통장입금(상세조회) <br />
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>010-0000-0000</td>
            </tr>
            <tr>
              <th>요청사항</th>
              <td>문 앞(직접수령)</td>
            </tr>
          </table>
        </section>
        <section>
          <button className='pay' onClick={() => {}}>
            결제하기
          </button>
          &nbsp;&nbsp; <button className='cancel'>메인 페이지로</button>
        </section>
      </div>
    </PayComp>
  );
}
