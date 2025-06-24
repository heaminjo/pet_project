import { useEffect, useState } from 'react';
import MemberApi from '../../../api/MemberApi';
import GoodsApi from '../../../api/GoodsApi';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function OrderListAll() {
  return (
    <OrderListAllComp>
      <div className='container'>
        <h2>전체 주문내역</h2>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>Order ID</th>
              <th>주문일</th>
              <th>가격</th>
              <th>주문 수량</th>
              <th>결제수단</th>
              <th>상태 관리</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </OrderListAllComp>
  );
}

const OrderListAllComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
  }
`;
