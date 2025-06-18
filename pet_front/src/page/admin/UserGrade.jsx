import styled from "styled-components";
import PieRing from "../../components/util/PieRing";
import PieComp from "../../components/util/PieComp";
import { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";
import UserGradeComp from "./UserGradeStyle";
import MemberApi from "../../api/MemberApi";

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
  const [gradeType, setGradeType] = useState("NEWBIE");
  const [userList, setUserList] = useState([]); //초기 목록은 NEWBIE로로
  const [backColor, setBackColor] = useState("#eaefef");
  const [render, setRender] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getGradeStatistics();
    getGradeUserList();
  }, [gradeType, render]);

  //그룹 통계 API
  const getGradeStatistics = async () => {
    const result = await AdminApi.getGradeStatistics();
    console.log(result);

    // //한글로 매핑
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

  //등급 별 회원 목록 가져오기
  const getGradeUserList = async () => {
    const result = await AdminApi.getGradeUserList(gradeType);
    console.log(gradeType);
    setUserList(result.slice(0, 5)); //처음 5개만 저장(상위 5명)
  };

  //등급 클릭
  const clickGrade = (gradeType, backColor) => {
    setGradeType(gradeType);
    setBackColor(backColor);
  };

  //업그레이드 클릭
  const clickUpgrade = (user) => {
    //index를 통하여 등급 배열에서 다음 등급이 무엇인지 가져온다.

    //먼저 인덱스 찾기
    const nextGradeindex = gradeKoreaList.indexOf(user.grade);
    //다음 등급 인덱스로 구하기
    const nextGrade = gradeList[nextGradeindex + 1];

    const newGrade = {
      userId: user.id,
      nextGrade: nextGrade,
    };

    gradeUpgrade(newGrade);
  };

  //등급 업그레이드 API
  const gradeUpgrade = async (newGrade) => {
    const result = await AdminApi.gradeUpgrade(newGrade);
    setRender(render + 1); //강제 랜더링
    alert(result.message);
  };

  //다음 등급을 알기위한 배열
  const gradeList = ["NEWBIE", "BLOSSOM", "BREEZE", "FLAME", "AURORA"];
  const gradeKoreaList = [
    "새싹회원",
    "초급회원",
    "중급회원",
    "상급회원",
    "프리미엄 회원",
  ];
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
          <li id="grade01" onClick={() => clickGrade("NEWBIE", "#eaefef")}>
            <span>{gradeData[0]?.name}</span>
          </li>
          <li id="grade02" onClick={() => clickGrade("BLOSSOM", "#ffe99a")}>
            <span>{gradeData[1]?.name}</span>
          </li>
          <li id="grade03" onClick={() => clickGrade("BREEZE", "#ffd586")}>
            <span>{gradeData[2]?.name}</span>
          </li>
          <li id="grade04" onClick={() => clickGrade("FLAME", "#ffaaaa")}>
            <span>{gradeData[3]?.name}</span>
          </li>
          <li id="grade05" onClick={() => clickGrade("AURORA", "#ff9898")}>
            <span>{gradeData[4]?.name}</span>
          </li>
        </ul>
        <table>
          <tr style={{ backgroundColor: backColor }}>
            <th>순위</th>
            <th>이메일</th>
            <th>이름</th>
            <th>포인트</th>
          </tr>
          {userList.length > 0 ? (
            userList?.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.point}</td>
                {user.grade != "프리미엄 회원" && (
                  <td className="btn_td">
                    <button onClick={() => clickUpgrade(user)}>
                      업그레이드
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>해당 등급의 회원이 존재하지않습니다.</td>
            </tr>
          )}
        </table>
      </div>
    </UserGradeComp>
  );
}
