import OrderDetailComp from './OrderDetailStyle';
import GoodsApi from '../../../api/GoodsApi';
import { useEffect, useState } from 'react';

export default function OrderDetail() {
  const prodImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const [orders, setOrders] = useState([]);
  const [info, setInfo] = useState([]);

  // 주문 정보 가져옴 - Return Type : OrderResponseDTO List ~~~~~~~~~~~~~~
  const orderList = () => {
    alert(`orderList 실행`);
    // 회원이 주문한 전체내역 orderList
    GoodsApi.orderList() //
      .then((response) => {
        //alert(`GoodsApi.orderList() 성공`);
        setOrders(response);
        goodsList(response);
      })
      .catch((err) => {
        alert(`GoodsApi.orderList() 에러 => ${err}`);
      });
  };

  // 전체 정보 가져옴 - Return Type : OrderDetailResponseDTO List
  // Goods List : 현재 Order의 order_id넘김 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const goodsList = (orders) => {
    const orderIds = orders.map((o) => o.order_id);
    GoodsApi.customerGoodsHistory(orderIds)
      .then((response) => {
        //alert(`GoodsApi.customerGoodsHistory() 성공`);
        if (Array.isArray(response)) {
          setInfo(response); // OrderDetail + Order + Goods 정보(일부) 리스트
        } else {
          console.error('비정상 응답:', response);
          setInfo([]); // fallback
        }
      }) //
      .catch((err) => {
        alert(`GoodsApi.customerGoodsHistory() 에러`);
      });
  };

  // 주문내역 리스트를 순회하며 날짜별로 그룹화 ~~~~~~~~~~~~~~~~~~~~
  const groupByDate = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const dateKey = new Date(item.reg_date).toISOString().split('T')[0]; // 'YYYY-MM-DD'
      // toISOString() : 시차 방어 (UTC 기준)
      // 2025-06-05T15:57:22.427+09:00 --> '2025-06-05' 추출
      if (!grouped[dateKey]) grouped[dateKey] = []; // 빈배열 방어
      grouped[dateKey].push(item);
    });
    return grouped;
  };

  // 함수 실행
  const groupedInfo = groupByDate(info);
  // 그룹화한 리스트 결과를 날짜 최신순 정렬
  const sortedDates = Object.keys(groupedInfo).sort((a, b) => new Date(b) - new Date(a));

  useEffect(() => {
    orderList();
  }, []);

  return (
    <OrderDetailComp>
      <div className='container'>
        <h2>주문내역 페이지</h2>
        <div>
          {sortedDates.map((date) => (
            <div key={date} className='orderlist'>
              <div className='ordertitle'>{date} 주문</div>
              {groupedInfo[date].map((item, index) => (
                <div className='orderlist2'>
                  <div className='orderdesc'>
                    <img src={prodImg} alt='' className='prodimg' />
                    <br />
                    <div className='proddesc'>
                      <b>결제완료</b> <br />
                      {item.goods_name} <br />
                      {item.goods_price} 원 / {item.goods_quantity} 개
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </OrderDetailComp>
  );
}
