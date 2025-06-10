import styled from "styled-components";
import PieRing from "../../components/util/PieRing";
import PieComp from "../../components/util/PieComp";
import { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";
import UserGradeComp from "./UserGradeStyle";

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
    const transformedData = Object.entries(result || {}).map(
      ([grade, dto]) => ({
        name: gradeKoreanMap[grade] || grade,
        value: dto.userNum,
        avg: dto.avgPoint,
        percent: dto.percent,
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
      <div className="list_table">
        <h4>등급 별 우수 회원 목록</h4>
        <ul className="line">
          <li id="grade01">
            <span>{gradeData[0]?.name}</span>
          </li>
          <li id="grade02">
            <span>{gradeData[1]?.name}</span>
          </li>
          <li id="grade03">
            <span>{gradeData[2]?.name}</span>
          </li>
          <li id="grade04">
            <span>{gradeData[3]?.name}</span>
          </li>
          <li id="grade05">
            <span>{gradeData[4]?.name}</span>
          </li>
        </ul>
        <table>
          <tr>
            <th>순위</th>
            <th>이메일</th>
            <th>이름</th>
            <th>포인트</th>
          </tr>
        </table>
      </div>
    </UserGradeComp>
  );
}
