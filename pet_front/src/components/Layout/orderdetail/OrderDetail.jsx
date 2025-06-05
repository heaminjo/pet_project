import { useLocation } from 'react-router-dom';
import OrderDetailComp from './OrderDetailStyle';
import GoodsApi from '../../../api/GoodsApi';
import { useEffect, useState } from 'react';

export default function OrderDetail() {
  const location = useLocation();
  const prodImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const [orders, setOrders] = useState([]);
  const [goods, setGoods] = useState([]);

  // OrderResponseDTO List
  const orderList = () => {
    // 회원이 주문한 전체내역 orderList
    GoodsApi.orderList() //
      .then((response) => {
        alert(`GoodsApi.orderList() 성공`);
        setOrders(response);
      }) //
      .catch((err) => {
        alert(`GoodsApi.orderList() 에러`);
      });
  };

  // Goods List : 고객이 주문한 적 있는 상품 리스트
  const goodsList = () => {
    GoodsApi.customerGoodsHistory()
      .then((response) => {
        alert(`GoodsApi.customerGoodsHistory() 성공`);
        setGoods(response);
      }) //
      .catch((err) => {
        alert(`GoodsApi.customerGoodsHistory() 에러`);
      });
  };

  useEffect(() => {
    orderList();
  }, []);

  return (
    <OrderDetailComp>
      <div className='container'>
        <h2>주문내역 페이지</h2>

        {orders.map((item, index) => {
          <div key={index}>
            <div className='ordertitle'>{item.reg_date} 주문</div>
            <div className='orderlist'>
              <div className='orderdesc'>
                <img src={prodImg} alt='' className='prodimg' />
                <br />
                <div className='proddesc'>
                  <b>결제완료</b> <br />
                  {item.goods_name} <br />
                  {item.price} 원 / 1 개
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
