import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PageNumber from '../../util/PageNumber';
import OrderApi from '../../../api/OrderApi';
import OrdersSearch from '../../util/OrdersSearch';
import MemberApi from '../../../api/MemberApi';

export default function OrderListAll() {
  // 페이징 관련 상태변수 (검색기능 포함)
  //페이지
  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('desc');
  const [state, setState] = useState('all');

  const [orderDetailList, setOrderDetailList] = useState([]);

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const getAllOrderDetailList = async () => {
    const pages = {
      page: page,
      size: 5,
      keyword: keyword,
      sortBy: sort,
      state: state !== 'all' ? state : null, // ORDERSTATE ENUM
    };

    // 주문 현황(전체) API 요청
    console.log(`orderlist 건수=> `);
    const response = await OrderApi.getAllOrderDetailList(pages);
    const list = response.content;

    // 각 주문의 회원 정보를 병합
    const withMember = await Promise.all(
      list.map(async (o) => {
        try {
          const member = await MemberApi.detail(o.memberId);
          return { ...o, member };
        } catch (e) {
          console.error('회원 조회 실패', o.memberId, e);
          return o;
        }
      })
    );

    setOrderDetailList(withMember);

    let temp = Math.floor(page / 5) * 5;

    setPaging({
      start: temp,
      end: Math.min(temp + 5, response.totalPages),
      isPrev: response.prev,
      isNext: response.next,
      totalElement: response.totalElements,
      totalPages: response.totalPages,
    });
  };

  useEffect(() => {
    getAllOrderDetailList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, category, state, sort]);

  return (
    <OrderListAllComp>
      <div className='container'>
        {/* <OrdersSearch setSort={setSort} sort={sort} setOrderDetailList={setOrderDetailList} getAllOrderDetailList={getAllOrderDetailList} setKeyword={setKeyword} setState={setState} /> */}
        <div className='list_container'>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>주문일</th>
                <th>구매자</th>
                <th>상품명</th>
                <th>별점</th>
                <th>가격</th>
                <th>수량</th>
                <th>재고</th>
                <th>누적판매량</th>
              </tr>
            </thead>
            <tbody>
              {orderDetailList.length > 0 ? (
                orderDetailList.map((od, index) => (
                  <tr key={od.orderDetailId}>
                    <td>{index + 1}</td>
                    <td>{od.regDate}</td>
                    <td>{od.memberId}</td>
                    <td>{od.goodsName}</td>
                    <td>{od.price}</td>
                    <td>{od.goodsQuantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>주문이 1건도 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <PageNumber page={page} setPage={setPage} paging={paging} />
        </div>
      </div>
    </OrderListAllComp>
  );
}

const OrderListAllComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
    padding: 20px 0;

    .list_container {
      table {
        border: 1px solid #ccc;
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        table-layout: fixed;

        thead {
          background-color: rgb(248, 246, 246);

          th {
            padding: 10px 5px;
            font-weight: bold;
            border-bottom: 1px solid #ccc;
          }
        }

        tbody {
          tr {
            height: 50px;

            td {
              border-bottom: 1px solid #ccc;
              padding: 8px 5px;
              word-wrap: break-word;
              word-break: break-all;
            }
          }

          tr:last-child td {
            border-bottom: none;
          }
        }
      }
    }
  }
`;
