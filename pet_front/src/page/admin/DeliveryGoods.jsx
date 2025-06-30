import { useEffect, useState } from "react";
import styled from "styled-components";
import GoodsApi from "../../api/GoodsApi";
import OrderApi from "../../api/OrderApi";
import AdminApi from "../../api/AdminApi";
import PageNumber from "../../components/util/PageNumber";

import React from "react";
import { useLocation } from "react-router-dom";
import GoodsSearch from "../../components/util/GoodsSearch";
import OrdersSearch from "../../components/util/OrdersSearch";

export default function DeliveryGoods() {
  const location = useLocation();
  const deliverImg = process.env.PUBLIC_URL + "/images/delivery.png";
  const [members, setMembers] = useState([]);
  const [goods, setGoods] = useState([]);
  const { goodsId } = location.state || {};
  const [allOrderList, setAllOrderList] = useState([]);
  const [delivery, setDelivery] = useState([]);

  // 검색
  const [orderList, setOrderList] = useState([]);

  // 페이징 관련 상태변수 (검색기능 포함)
  //페이지
  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("desc");
  const [state, setState] = useState("all");
  const [select, setSelect] = useState([]);

  const params = new URLSearchParams(location.search);
  const sortParam = params.get("sort") || "desc";

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // 결제 상태
  const statusMap = {
    결제전: "BEFOREPAY",
    결제완료: "AFTERPAY",
    상품준비중: "READY",
    배송중: "DELIVERY",
    배송완료: "END",
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const getOrderList = async () => {
    const pages = {
      page: page,
      size: 5,
      keyword: keyword,
      sortBy: sort,
      state: state !== "all" ? state : null, // ORDERSTATE ENUM
    };

    // 주문 현황(전체) API 요청
    console.log(`orderlist 건수=> `);
    const response = await OrderApi.getAllOrderList(pages);
    setAllOrderList(response.content);

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

  //주문상태 업데이트
  const updateState = async (id, prevState, newState) => {
    if (!id || id === "undefined") {
      alert("ID가 유효하지 않습니다. 1");
      return;
    }

    //만약 현재 상태와 같다면 그냥 두고 같지않다면 변경 API 호출
    if (prevState != newState) {
      await AdminApi.updateOrderState(id, newState);
      getOrderList();
    }
  };

  useEffect(() => {
    getOrderList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category, state, sort]);

  return (
    <DeliveryGoodsComp>
      <h2>주문상태 관리(결제전/결제완료/배송중)</h2>
      <div className="container">
        <OrdersSearch
          setSort={setSort}
          sort={sort}
          setOrderList={setOrderList}
          getOrderList={getOrderList}
          setKeyword={setKeyword}
          setState={setState}
        />
        <div className="list_container">
          <table>
            <thead>
              <tr>
                <th style={{ width: "10px" }}>No</th>
                <th>주문자 [메일]</th>
                <th>주문자 [연락처]</th>
                <th>주문일</th>
                <th>가격</th>
                <th>수량</th>
                <th>결제수단</th>
                <th>배송지</th>
                <th>상태 관리</th>
              </tr>
            </thead>
            <tbody>
              {allOrderList.length > 0 ? (
                allOrderList.map((o, index) => (
                  <tr key={o.orderId}>
                    <td>{index + 1}</td> {/* 번호 */}
                    <td>{o.email}</td> {/* 주문자 이메일 */}
                    <td>{o.phone}</td> {/* 주문자 연락처 */}
                    <td>{o.regDate}</td> {/* 주문일 */}
                    <td>{o.totalPrice}</td> {/* 가격 */}
                    <td>{o.totalQuantity}</td> {/* 주문 수량 */}
                    <td>{o.payment}</td>
                    <td>{`[ ${o.zipCode} ]${o.address}`}</td>
                    <td>
                      {/* 상태 변경 */}
                      {[
                        "결제전",
                        "결제완료",
                        "상품준비중",
                        "배송중",
                        "배송완료",
                      ].map((stateKor) => {
                        const engState = statusMap[stateKor]; // 영어 ENUM 값
                        return (
                          <button
                            key={stateKor}
                            onClick={() =>
                              updateState(o.orderId, o.status, engState)
                            }
                            className={
                              o.status === engState ? "btn active" : "btn"
                            }
                          >
                            {stateKor}
                          </button>
                        );
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>주문이 1건도 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </DeliveryGoodsComp>
  );
}

const DeliveryGoodsComp = styled.div`
  .container {
    width: 1800px;
    padding: 20px 0;

    .list_container {
      table {
        border: 1px solid #000;
        width: 1500px;
        text-align: center;
        border-collapse: collapse;
        padding-bottom: 20px;
        tr {
          height: 50px;
          th {
            background-color: #b0befc;
          }
          td {
            border-bottom: 1px solid #ccc;
            margin: 5px;
            img {
              width: 80px;
              height: 80px;
            }
          }
          td:nth-last-child(1) {
            button {
              width: 80px;
              height: 40px;
              border: none;
              cursor: pointer;
              font-weight: bold;
              margin: 0 2px;
            }
            .active {
              background-color: #ff8c8c;
            }
          }
        }
      }
    }
  }
`;
