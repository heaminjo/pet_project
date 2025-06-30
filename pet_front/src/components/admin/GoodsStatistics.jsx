import { useEffect, useState } from "react";
import styled from "styled-components";
import AdminApi from "../../api/AdminApi";
import GoodsApi from "../../api/GoodsApi";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function GoodsStatistics() {
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();
  const [goodsData, setGoodsData] = useState([]);
  useEffect(() => {
    getGoodsRank();
  }, []);

  //상품 순위 통계 (10)
  const getGoodsRank = async () => {
    const result = await AdminApi.getGoodsRank();
    setGoodsData(result);
  };

  //상품 상세정보
  const goodsDetail = async (id) => {
    const result = await GoodsApi.goodsDetail(id);
    setGoods(result);

    console.log(goods);
  };
  return (
    <OrderStatisticsComp>
      <h2>상품 통계</h2>
      <div className="goods_statistics_inner">
        <div className="date_statis">
          <h3>
            상품 순위 <span>(매출액 기준)</span>
          </h3>
          <div className="data_container">
            <div className="goods_data">
              <table>
                <tr>
                  <th>순위</th>
                  <th>상품명</th>
                  <th>판매 수량</th>
                  <th>매출액</th>
                </tr>
                {goodsData.length > 0 ? (
                  <React.Fragment>
                    {goodsData.map((g, index) => (
                      <tr
                        className={index == 0 && "top"}
                        onClick={() => goodsDetail(g.goodsId)}
                      >
                        <td>{index + 1}</td>
                        {g.goodsName}
                        <td>{g.totalPurchaseCount}</td>
                        <td>{g.totalPurchasePrice?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <tr>
                      <td colSpan={4}>등록된 상품이 1건도 없습니다.</td>
                    </tr>
                  </React.Fragment>
                )}
              </table>
            </div>
            {goods.length !== 0 ? (
              <div className="detail true">
                <img src={goods.imageFile} alt="상품 이지미" />
                <table>
                  <tr>
                    <th>상품명 </th>
                    <td>{goods.goodsName}</td>
                  </tr>
                  <tr>
                    <th>카테고리 </th>
                    <td>{goods.category.categoryName}</td>
                  </tr>
                  <tr>
                    <th>판매가격 </th>
                    <td>{goods.price}</td>
                  </tr>
                  <tr>
                    <th>수량</th>
                    <td>{goods.quantity}</td>
                  </tr>
                  <tr>
                    <th>후기</th>
                    <td>{goods.reviewNum}</td>
                  </tr>
                  <tr>
                    <th>조회수</th>
                    <td>{goods.views}</td>
                  </tr>
                </table>
                <button
                  onClick={() =>
                    navigate("/goods/order", { state: { goods: goods } })
                  }
                >
                  상품 보러가기
                </button>
              </div>
            ) : (
              <div className="detail false">
                <p>
                  상품을 클릭하여 <br />
                  상세 정보를 확인하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </OrderStatisticsComp>
  );
}
const OrderStatisticsComp = styled.div`
  width: 100%;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .goods_statistics_inner {
    width: 100%;
    .date_statis {
      border: 1px solid #ccc;
      box-shadow: 3px 3px 3px #ccc;
      padding: 20px;
      h3 {
        padding: 20px 0;
        span {
          font-size: 13px;
          color: #555;
        }
      }
      .data_container {
        display: flex;
        width: 100%;
        gap: 15px;
        .goods_data {
          display: flex;
          width: 75%;
          table {
            width: 100%;
            border: 1px solid #000;
            border-collapse: collapse;
            text-align: center;
            tr {
              height: 50px;
              line-height: 50px;
              border-bottom: 1px solid #ccc;
              th {
                background-color: #ffcfd7;
              }
              td {
              }
            }
            .top {
              font-weight: bold;
              color: red;
            }
            tr:hover {
              background-color: #eee;
              cursor: pointer;
            }
          }
        }
        .detail {
          width: 25%;
          border: 2px solid #ccc;
          box-shadow: 3px 3px 3px #ccc;
          height: 430px;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }
        .false {
          text-align: center;
          justify-content: center;
          background-color: #eee;
        }
        .true {
          img {
            margin: 0 auto;
            width: 150px;
            height: 150px;
            border: 1px solid #777;
            border-radius: 20px;
          }
          table {
            margin-top: 50px;
            border-collapse: collapse;
            tr {
              height: 30px;

              th {
                width: 100px;
                text-align: start;
              }
              td {
                border-bottom: 1px solid #ccc;
              }
            }
          }
          button {
            margin-top: 10px;
            height: 40px;
            border: none;
            background-color: #ffccd6;
            box-shadow: 2px 2px 2px #888;
            font-weight: bold;
            color: #fff;
            text-shadow: 1px 1px 1px #000;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
