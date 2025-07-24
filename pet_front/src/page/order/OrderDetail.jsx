import OrderDetailComp from './OrderListStyle';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageNumber from '../../util/PageNumber';

export default function OrderDetail() {
  return (
    <OrderDetailComp>
      <div className='container'>
        <h2>주문내역 페이지</h2>

        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </OrderDetailComp>
  );
}
