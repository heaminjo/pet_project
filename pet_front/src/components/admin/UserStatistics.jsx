import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import PieComp from "../util/PieComp";
import styled from "styled-components";
import { useEffect } from "react";

const StatisticsComp = styled.div`
  .m_statis_container {
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    h2 {
    }
    .chart {
      display: flex;
      border: 1px solid #ccc;
      box-shadow: 4px 4px 3px #ccc;
      padding: 20px;
      .re_chart {
        ul {
          display: flex;
          gap: 10px;
          li {
            display: flex;
            align-items: center;
            gap: 10px;
            span {
              font-weight: bold;
            }
            #black_color {
              background-color: #3d3d3d;
              width: 20px;
              height: 10px;
            }
            #red_color {
              background-color: #ff0000;
              width: 20px;
              height: 10px;
            }
          }
        }
      }
      .text_chart {
        display: flex;
        align-items: center;
        width: 100%;
        table {
          display: flex;
          flex-direction: column;
          width: 100%;
          tr {
            border-bottom: 1px solid #ccc;
            width: 100%;
            height: 30px;
            th {
              width: 120px;
              text-align: start;
            }
          }
        }
      }
    }
  }
`;
//회원 통계 컴포넌트트
export default function UserStatistics({ userData }) {
  const data = [
    {
      name: "notLogin",
      value: 100 - (userData.todayUser / userData.totalUser) * 100,
    },
    {
      name: "login",
      value: (userData.todayUser / userData.totalUser) * 100,
    },
  ];

  const COLORS = ["#3d3d3d", "#ff0000"];

  return (
    <StatisticsComp>
      <div className="m_statis_container">
        <h2>회원 통계</h2>
        <div className="chart">
          <div className="re_chart">
            <PieComp data={data} COLORS={COLORS} width={250} height={250} />
            <ul className="color_box">
              <li>
                <div id="black_color"></div>
                <span>비로그인</span>
              </li>
              <li>
                <div id="red_color"></div>
                <span>로그인</span>
              </li>
            </ul>
          </div>
          <div className="text_chart">
            <table>
              <tr>
                <th>총 회원 수</th>
                <td>{userData.totalUser}</td>
              </tr>
              <tr>
                <th>오늘 로그인 수</th>
                <td>{userData.todayUser}</td>
              </tr>
              <tr>
                <th>비로그인 수</th>
                <td>{userData.totalUser - userData.todayUser}</td>
              </tr>
              <tr>
                <th>- - - </th>
              </tr>
              <tr>
                <th>- - - </th>
              </tr>
              <tr>
                <th>- - - </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </StatisticsComp>
  );
}
