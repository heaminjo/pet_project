import styled from "styled-components";
import PieRing from "../../components/util/PieRing";
import PieComp from "../../components/util/PieComp";
import { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";

export default function UserGrade() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#EAEFEF", "#FFE99A", "	#FFD586", "#FFAAAA", "	#FF9898"];

  //등급 통계 데이터
  const [gradeData, setGradeData] = useState([]);

  const getGradeStatistics = async () => {
    const result = await AdminApi.getGradeStatistics();

    const transformedData = Object.entries(result.userGrade).map(
      ([grade, count]) => ({
        name: grade,
        value: count,
      })
    );

    setGradeData(transformedData);
  };
  //등급 통계 가져오기
  useEffect(() => {
    getGradeStatistics();
  }, []);
  return (
    <UserGradeComp>
      <div className="grade_intro">
        <div className="chart">
          <PieRing data={gradeData} COLORS={COLORS} />
        </div>
        <ul className="line">
          <li id="grade01">
            <span>새싹회원</span>
          </li>
          <li id="grade02">
            <span>초급회원</span>
          </li>
          <li id="grade03">
            <span>중급회원</span>
          </li>
          <li id="grade04">
            <span>상급회원</span>
          </li>
          <li id="grade05">
            <span>프리미엄회원</span>
          </li>
        </ul>
      </div>
    </UserGradeComp>
  );
}
const UserGradeComp = styled.div`
  .grade_intro {
    width: 900px;
    position: relative;
    display: flex;
    .chart {
      border: none;
      position: absolute;
      width: 230px;
      height: 250px;
      background-color: #fff;
      border-radius: 0 100% 100% 0;
      top: -5px;
      left: -20px;
    }
    .line {
      width: 800px;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      li {
        text-align: end;
        padding-right: 10px;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        box-shadow: 1px 1px 1px 1px #888;
        cursor: pointer;
        span {
          font-weight: bold;
          color: #fff;
          text-shadow: 1px 1px 1px #000;
        }
      }
      #grade01 {
        background-color: #eaefef;
      }
      #grade02 {
        background-color: #ffe99a;
      }
      #grade03 {
        background-color: #ffd586;
      }
      #grade04 {
        background-color: #ffaaaa;
      }
      #grade05 {
        background-color: #ff9898;
      }
    }
  }
`;
