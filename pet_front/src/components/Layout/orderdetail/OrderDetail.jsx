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
    alert(`orderList 실행`);
    // 회원이 주문한 전체내역 orderList
    GoodsApi.orderList() //
      .then((response) => {
        //alert(`GoodsApi.orderList() 성공`);
        response.map((m) => console.log(m));
        setOrders(response);
        goodsList(orders);
      }) //
      .catch((err) => {
        alert(`GoodsApi.orderList() 에러 => ${err}`);
      });
  };

  // Goods List : 현재 Order의 order_id넘김
  const goodsList = (orders) => {
    const orderIds = orders.map((o) => o.order_id);
    GoodsApi.customerGoodsHistory(orderIds)
      .then((response) => {
        //alert(`GoodsApi.customerGoodsHistory() 성공`);
        setGoods(response);
      }) //
      .catch((err) => {
        alert(`GoodsApi.customerGoodsHistory() 에러`);
      });
  };

  useEffect(() => {
    orderList();
  }, []);
  useEffect(() => {
    if (orders.length > 0) {
      goodsList(orders);
    }
  }, [orders]);

  return (
    <OrderDetailComp>
      <div className='container'>
        <h2>주문내역 페이지</h2>
        <div>
          {orders
            .slice()
            .sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date))
            .map((item, index) => {
              return (
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
                </div>
              );
            })}
        </div>
      </div>
    </OrderDetailComp>
  );
}
