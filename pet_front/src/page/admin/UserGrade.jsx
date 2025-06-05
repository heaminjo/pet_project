import styled from "styled-components";
import PieRing from "../../components/util/PieRing";
import PieComp from "../../components/util/PieComp";

export default function UserGrade() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#a8d5ba", "#ffb7b2", "	#aed9e0", "#ff6f3c", "	#00f5d4"];

  return (
    <UserGradeComp>
      <div className="grade_intro">
        <div className="chart">
          <PieRing COLORS={COLORS} />
        </div>
        <ul>
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
    ul {
      width: 600px;
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
        box-shadow: 1px 1px 1px 1px #ccc;
        cursor: pointer;
        span {
          font-weight: bold;
          color: #fff;
          text-shadow: 1px 1px 1px #000;
        }
      }
      #grade01 {
        background-color: #a8d5ba;
      }
      #grade02 {
        background-color: #ffb7b2;
      }
      #grade03 {
        background-color: #aed9e0;
      }
      #grade04 {
        background-color: #ff6f3c;
      }
      #grade05 {
        background-color: #00f5d4;
      }
    }
  }
`;
