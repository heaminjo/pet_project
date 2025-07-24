import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminApi from '../../api/AdminApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Rectangle } from 'recharts';

export default function OrderStatistics() {
  const [date, setDate] = useState('ALL');
  const [orderData, setOrderData] = useState([]);
  const [chartData, setChartData] = useState([]);
  //기간 클릭
  const dateClick = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    getOrderStatistics();
  }, []);

  //조회 버튼 클릭
  const getOrderStatistics = async () => {
    const result = await AdminApi.getOrderStatistics(date);

    setOrderData(result);

    setChartData([
      {
        name: '목표',
        uv: 10000000,
      },
      {
        name: '총 매출액',
        uv: result.totalPurchasePrice,
      },
    ]);
  };
  return (
    <OrderStatisticsComp>
      <h2>매출 분석</h2>
      <div className='order_statistics_inner'>
        <div className='date_statis'>
          <h3>기간 별 매출 분석</h3>
          <div className='inner_'>
            <div className='date_'>
              <div className='input_'>
                <div className='input_title'>
                  <p>조회 기간</p>
                </div>
                <div className='radio_'>
                  <label className={date == 'ALL' ? 'select' : 'not'} onClick={(e) => dateClick(e)}>
                    <input type='radio' name='date' value='ALL' />
                    전체
                  </label>
                  <label className={date == '1D' ? 'select' : 'not'} onClick={(e) => dateClick(e)}>
                    <input type='radio' name='date' value='1D' />
                    오늘
                  </label>
                  <label className={date == '7D' ? 'select' : 'not'} onClick={(e) => dateClick(e)}>
                    <input type='radio' name='date' value='7D' />
                    최근 7일
                  </label>
                  <label className={date == '1M' ? 'select' : 'not'} onClick={(e) => dateClick(e)}>
                    <input type='radio' name='date' value='1M' />
                    최근 1개월
                  </label>
                  <label className={date == '6M' ? 'select' : 'not'} onClick={(e) => dateClick(e)}>
                    <input type='radio' name='date' value='6M' />
                    최근 6개월
                  </label>
                </div>
                <div className='btn_'>
                  <button onClick={() => getOrderStatistics()}>조회</button>
                </div>
              </div>

              <div className='table_'>
                <table border={1}>
                  <tr>
                    <th>총 매출액</th>
                    <th>평균 매출액</th>
                    <th>총 주문 건</th>
                  </tr>
                  <tr>
                    <td>
                      <span>{orderData.totalPurchasePrice?.toLocaleString()}</span>
                    </td>
                    <td>
                      <span>{orderData.avgPrice?.toLocaleString()}</span>
                    </td>
                    <td>
                      <span>{orderData.totalPurchaseCount}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className='chart_'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey='pv' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
                  <Bar dataKey='uv' fill='#036e2c' activeBar={<Rectangle fill='gold' stroke='purple' />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
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
  .order_statistics_inner {
    width: 100%;
    .date_statis {
      width: 100%;
      border: 1px solid rgb(158, 141, 141);
      padding: 20px;
      box-shadow: 2px 2px 3px #ccc;
      .inner_ {
        display: flex;
        width: 90%;
        margin: 0 auto;
        .date_ {
          width: 700px;
          padding: 20px 0;
          .input_ {
            display: flex;
            gap: 20px;
            align-items: center;
            height: 80px;
            border: 1px solid rgb(158, 141, 141);
            .input_title {
              width: 120px;
              line-height: 80px;
              background-color: #ccc;
              text-align: center;
            }
            .radio_ {
              display: flex;
              gap: 10px;
              font-size: 14px;
              label {
                width: 70px;
                height: 30px;
                line-height: 30px;
                border: 1px solid rgb(158, 141, 141);
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
              border: 1px solid rgb(182, 174, 174);
              th {
                height: 30px;
                background-color: rgb(233, 228, 228);
                border: 1px solid rgb(182, 174, 174);
              }
            }
          }
        }
      }
      .chart_ {
        padding-top: 20px;
        width: 300px;
        height: 300px;
      }
    }
  }
`;
