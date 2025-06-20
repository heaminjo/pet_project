import { useState } from "react";
import styled from "styled-components";
import AdminApi from "../../api/AdminApi";

export default function OrderStatistics() {
  const [date, setDate] = useState("INTERVAL 1 DAY");

  //기간 클릭
  const dateClick = (e) => {
    setDate(e.target.value);
  };

  //조회 버튼 클릭
  const clickSearch = async () => {
    const result = await AdminApi.getOrderStatistics(date);
    console.log(result);
  };
  return (
    <OrderStatisticsComp>
      <h2>매출 분석</h2>
      <div className="order_statistics_inner">
        <div className="date_statis">
          <h3>기간 별 매출 분석</h3>
          <div className="date_">
            <div className="input_">
              <div className="input_title">
                <p>조회 기간</p>
              </div>
              <div className="radio_">
                <label
                  className={date == "INTERVAL 1 DAY" ? "select" : "not"}
                  onClick={(e) => dateClick(e)}
                >
                  <input type="radio" name="date" value="1D" />
                  오늘
                </label>
                <label
                  className={date == "INTERVAL 7 DAY" ? "select" : "not"}
                  onClick={(e) => dateClick(e)}
                >
                  <input type="radio" name="date" value="7D" />
                  최근 7일
                </label>
                <label
                  className={date == "INTERVAL 1 MONTHS" ? "select" : "not"}
                  onClick={(e) => dateClick(e)}
                >
                  <input type="radio" name="date" value="1M" />
                  최근 1개월
                </label>
                <label
                  className={date == "INTERVAL 6 MONTHS" ? "select" : "not"}
                  onClick={(e) => dateClick(e)}
                >
                  <input type="radio" name="date" value="6M" />
                  최근 6개월
                </label>
              </div>
              <div className="btn_">
                <button onClick={() => clickSearch()}>조회</button>
              </div>
            </div>

            <div className="table_">
              <table border={1}>
                <tr>
                  <th>총 매출액</th>
                  <th>평균 매출액</th>
                  <th>총 주문 건</th>
                </tr>
                <tr>
                  <td>
                    <span>111000000</span>
                  </td>
                  <td>
                    <span>111000000</span>
                  </td>
                  <td>
                    <span>111000000</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </OrderStatisticsComp>
  );
}
const OrderStatisticsComp = styled.div`
  width: 1000px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .order_statistics_inner {
    width: 100%;
    .date_statis {
      width: 100%;
      border: 1px solid #ccc;
      padding: 20px;
      box-shadow: 3px 3px 3px #ccc;
      .date_ {
        width: 650px;
        padding: 20px 0;
        .input_ {
          display: flex;
          gap: 20px;
          align-items: center;
          height: 80px;
          border: 1px solid #888;
          .input_title {
            width: 120px;
            line-height: 80px;
            background-color: #ccc;
            text-align: center;
          }
          .radio_ {
            display: flex;
            gap: 20px;
            font-size: 14px;
            label {
              width: 75px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #555;
              text-align: center;
              cursor: pointer;
              input {
                display: none;
              }
            }
            .select {
              background-color: #000;
              color: #fff;
            }
          }
          .btn_ {
            button {
              width: 100px;
              height: 40px;
              box-shadow: 2px 2px 2px #888;
              border: none;
              cursor: pointer;
            }
          }
        }
      }
      .table_ {
        width: 100%;
        table {
          width: 100%;
          height: 150px;
          margin-top: 30px;
          border-collapse: collapse;
          text-align: center;
          tr {
            th {
              height: 30px;
              background-color: rgb(255, 251, 223);
            }
          }
        }
      }
    }
  }
`;
