import { useLocation } from 'react-router-dom';
import OrderDetailComp from './OrderDetailStyle';
import GoodsApi from '../../../api/GoodsApi';

export default function OrderDetail() {
  const location = useLocation();
  const prodImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const orderList = location.state?.orderList || [];

  const goodsList = (orderList) => {
    const goodsIds = orderList.map((item) => item.goods_id);
    GoodsApi.orderList();
  };

  return (
    <OrderDetailComp>
      <div className='container'>
        <h2>주문내역 페이지</h2>
        {orderList.map((item, index) => {
          <div key={index}>
            <div className='ordertitle'>2025. 5. 21 주문</div>
            <div className='orderlist'>
              <div className='orderdesc'>
                <img src={prodImg} alt='' className='prodimg' />
                <br />
                <div className='proddesc'>
                  <b>결제완료</b> <br />
                  강아지 사료 프리미엄, 1개 <br />
                  10000 원 / 1 개
                  <br />
                  <br />
                  <br />
                  <button>장바구니 담기</button>
                </div>

                <div className='btn'>
                  <button className='btn1'>배송조회</button>
                  <button className='btn2'>주문취소</button>
                  <button className='btn3'>제품문의</button>
                </div>
              </div>
            </div>
          </div>;
        })}
      </div>
    </OrderDetailComp>
  );
}
