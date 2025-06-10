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
    console.log(result);
    // //한글로 매핑핑
    const gradeKoreanMap = {
      NEWBIE: "새싹회원",
      BLOSSOM: "초급회원",
      BREEZE: "중급회원",
      FLAME: "상급회원",
      AURORA: "프리미엄회원",
    };
    const transformedData = Object.entries(result).map(([grade, dto]) => ({
      name: gradeKoreanMap[grade] || grade,
      value: dto.userNum,
      avg: dto.avgPoint,
      percent: dto.percent,
    }));
    setGradeData(transformedData);
  };
  //등급 통계 가져오기
  useEffect(() => {
    getGradeStatistics();
  }, []);
  return (
    <UserGradeComp>
      <h2>등급별 회원 통계</h2>
      <div className="grade_intro">
        <div className="chart">
          <PieRing data={gradeData} COLORS={COLORS} />
        </div>
        <ul className="line">
          <li id="grade01">
            <span>
              {gradeData[0]?.percent.toFixed(1)}% {gradeData[0]?.name}
            </span>
          </li>
          <li id="grade02">
            <span>
              {gradeData[1]?.percent.toFixed(1)}% {gradeData[1]?.name}
            </span>
          </li>
          <li id="grade03">
            <span>
              {gradeData[2]?.percent.toFixed(1)}% {gradeData[2]?.name}
            </span>
          </li>
          <li id="grade04">
            <span>
              {gradeData[3]?.percent.toFixed(1)}% {gradeData[3]?.name}
            </span>
          </li>
          <li id="grade05">
            <span>
              {gradeData[4]?.percent.toFixed(1)}% {gradeData[4]?.name}
            </span>
          </li>
        </ul>
      </div>
      <div className="grade_table">
        <table>
          <tr>
            <th>
              <span>등급</span>
            </th>
            <th>
              <span>인원수</span>
            </th>
            <th>
              <span>비율</span>
            </th>
            <th>
              <span>평균 포인트</span>
            </th>
            <th>
              <span>혜택 요약</span>
            </th>
          </tr>
          {gradeData.map((g) => (
            <tr>
              <td>{g.name}</td>
              <td>{g.value}명</td>
              <td>{g.percent.toFixed(1)}%</td>
              <td>{g.avg.toFixed(1)}P</td>
              <td>---------------------</td>
            </tr>
          ))}
        </table>
      </div>
    </UserGradeComp>
  );
}
const UserGradeComp = styled.div`
  h2 {
    margin-bottom: 20px;
    color: #333;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* 살짝 반사 느낌 */
  }
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
          color: #333; /* 어두운 회색 - 순수한 검정보다는 덜 부담스러움 */
          font-weight: 500; /* 기본보다 약간 진하게 */
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* 살짝 반사 느낌 */
          font-weight: bold;
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
  .grade_table {
    width: 100%;
    padding: 30px 0;
    table {
      border-collapse: collapse;
      text-align: center;
      width: 900px;
      tr {
        height: 50px;

        th {
          height: 40px;
          background-color: #ff9898;
          color: #fff;
          text-shadow: 1px 1px 1px #ccc;
        }
        td {
          border-bottom: 1px solid #ccc;
          padding-left: 5px;
        }
        td:nth-child(1) {
          width: 150px;
        }
        td:nth-child(2) {
          width: 50px;
        }
      }
    }
  }
`;
