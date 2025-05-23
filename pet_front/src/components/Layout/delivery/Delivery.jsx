import DeliveryComp from './DeliveryStyle';
// import './delivery.css';

export default function Delivery() {
  const deliverImg = process.env.PUBLIC_URL + '/images/delivery.png';

  return (
    <DeliveryComp>
      <div className='container'>
        <div class='title'>배송조회</div>
        <div className='box1'>
          배송이 시작 되었습니다 <br />
        </div>
        <hr />
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
                <td>판매자 정보보기</td>
              </tr>
            </table>
          </section>
          <hr />
          <section className='user'>
            <table className='userinfo'>
              <tr>
                <td>받는사람</td>
                <td>정서영</td>
              </tr>
              <tr>
                <td>받는주소</td>
                <td>경기도 수원시</td>
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
