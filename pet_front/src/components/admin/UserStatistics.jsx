import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import PieComp from "../util/PieComp";
import styled from "styled-components";
import { useEffect } from "react";
import AreaComp from "../util/AreaComp";
import StatisticsComp from "./UserStaticticsStyle";

//회원 통계 컴포넌트트
export default function UserStatistics({ userData }) {
  //로그인 데이터
  const loginData = [
    {
      name: "notLogin",
      value: 100 - (userData.todayUser / userData.totalUser) * 100,
    },
    {
      name: "login",
      value: (userData.todayUser / userData.totalUser) * 100,
    },
  ];
  //성별 데이터
  const genderData = [
    { name: "male", value: userData.male },
    { name: "female", value: userData.female },
  ];

  //7일 회원 가입 데이터
  const joinData = userData?.weekReg?.map((day, index) => ({
    name: day,
    uv: userData?.weekJoin[index],
  }));
  //컬러
  const COLORS1 = ["#3d3d3d", "#00ff33"];
  const COLORS2 = ["#5e69ff", "#ff4e4e"];
  return (
    <StatisticsComp>
      <h2>회원 통계</h2>
      <div className="m_statis_container">
        <div className="m_container01">
          <div className="chart">
            <div className="re_chart">
              <h4>오늘 방문자 통계</h4>
              <PieComp
                data={loginData}
                COLORS={COLORS1}
                width={250}
                height={250}
              />
              <ul className="color_box">
                <li>
                  <div id="t_login"></div>
                  <span>비로그인</span>
                </li>
                <li>
                  <div id="f_login"></div>
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
                  <th>오늘 방문자</th>
                  <td>{userData.todayUser}</td>
                </tr>
                <tr>
                  <th>비방문자</th>
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
          <div className="chart">
            <div className="re_chart">
              <h4>회원 성별 비율</h4>
              <div className="gender_chart">
                <PieComp
                  data={genderData}
                  COLORS={COLORS2}
                  width={250}
                  height={250}
                />
                <ul className="color_box">
                  <li>
                    <div id="boy"></div>
                    <span>남자</span>
                  </li>
                  <li>
                    <div id="girl"></div>
                    <span>여자</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="m_container02">
          <div className="chart">
            <h4>최근 7일 신규 가입자</h4>
            <div className="chart_inner">
              <div className="text_chart">
                <table>
                  <tr>
                    <th>오늘 신규 가입자</th>
                    <td>{userData.weekJoin[7]}</td>
                  </tr>
                  <tr>
                    <th>이번주 신규 가입자</th>
                    <td>
                      {userData.weekJoin.reduce((sum, count) => sum + count)}
                    </td>
                  </tr>
                </table>
              </div>
              <div className="pic_chart">
                <AreaComp data={joinData} width={740} height={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatisticsComp>
  );
}
