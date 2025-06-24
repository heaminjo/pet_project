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
