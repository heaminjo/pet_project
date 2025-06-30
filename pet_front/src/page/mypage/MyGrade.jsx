import { useContext, useState } from "react";
import { PetContext } from "./MyPage";
import GradeComp from "./MyGradeStyle";
import { useNavigate } from "react-router-dom";
import { FaMedal } from "react-icons/fa";

export default function MyGrade() {
  const { user } = useContext(PetContext);
  const navigate = useNavigate();
  window.scrollTo({ top: 0, behavior: "smooth" });
  //회원의 등급에 따른 등급 정보
  const gradeStyleMap = {
    새싹회원: {
      next: "초급회원",
      nextColor: "#cfe7f0",
      backColor: "#f2fdff",
      width: "190px",
      condition1: 3,
      condition2: 1,
      boon: "새싹 등급은 아직 혜택이 없습니다.",
    },
    초급회원: {
      next: "중급회원",
      nextColor: "#f0d5ce",
      backColor: "#cfe7f0",
      width: "390px",
      condition1: 5,
      condition2: 3,
      condition3: 30000,
      boon: "구매 시 5% 할인",
    },
    중급회원: {
      next: "상급회원",
      nextColor: "#ecbfb1",
      backColor: "#f0d5ce",
      width: "590px",
      condition1: 10,
      condition2: 10,
      condition3: 100000,
      boon: "구매 시 7% 할인",
    },
    상급회원: {
      next: "프리미엄회원",
      nextColor: "#de9d91",
      backColor: "#ecbfb1",
      width: "790px",
      condition1: 20,
      condition2: 15,
      condition3: 300000,
      boon: "구매 시 10% 할인",
    },
    "프리미엄 회원": {
      next: "---------",
      backColor: "#de9d91",
      width: "1000px",
      boon: "구매 시 20% 할인",
    },
  };
  const gradeData = gradeStyleMap[user.grade] ?? {
    next: "",
    nextColor: "#ccc",
    backColor: "#ccc",
    width: "0px",
  };

  //등급별 UI를 위한 데이터
  const grades = [
    { name: "새싹회원", color: "	#f2fdff" },
    { name: "초급회원", color: "	#cfe7f0" },
    { name: "중급회원", color: " #f0d5ce " },
    { name: "상급회원", color: "#ecbfb1" },
    { name: "프리미엄 회원", color: "#de9d91" },
  ];

  return (
    <GradeComp data={gradeData}>
      <div className="grade_info">
        <div className="my_grade">
          <div className="grade_name">
            <h2>
              {user.name}님의 등급 <br /> <span>{user.grade}</span>
            </h2>
            <FaMedal style={{ color: gradeData.backColor }} />
          </div>
          <div className="user_activity">
            <h3>활동 내역</h3>
            <table>
              <tr>
                <th>누적 방문일 </th>
                <td>{user.loginCount}</td>
              </tr>
              <tr>
                <th>누적 주문 수</th>
                <td>{user.totalPurchaseCount}</td>
              </tr>
              <tr>
                <th>누적 주문 금액</th>
                <td>{user.totalPurchasePrice}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="boon">
          <h3>{user.grade} 등급 혜택</h3>
          <div className="text">
            <p>{gradeData.boon}</p>
          </div>
        </div>
      </div>

      <div className="next_grade">
        <div className="upgrade prev">
          <h2>{user.grade}</h2>
        </div>
        <div className="upgrade_condition">
          <h3>다음 등급 ▶</h3>
          <ul>
            <li>
              <p>누적 방문일</p>
              {user.loginCount >= gradeData.condition1 ? (
                <span>✅</span>
              ) : (
                <span>
                  다음 등급까지 <br />
                  {user.loginCount}/{gradeData.condition1}
                </span>
              )}
            </li>
            <li>
              <p>누적 주문 수</p>
              {user.totalPurchaseCount >= gradeData.condition2 ? (
                <span>✅</span>
              ) : (
                <span>
                  다음 등급까지 <br />
                  {user.totalPurchaseCount} / {gradeData.condition2}
                </span>
              )}
            </li>
            {gradeData.condition3 != null && (
              <li>
                <p>누적 주문 금액</p>
                {user.totalPurchasePrice >= gradeData.condition3 ? (
                  <big>✅</big>
                ) : (
                  <span>
                    다음 등급까지 <br />
                    {user.totalPurchasePrice}/{gradeData.condition3}
                  </span>
                )}
              </li>
            )}
          </ul>
        </div>
        <div className="upgrade next">
          <h2>{gradeData.next}</h2>
        </div>
      </div>
      <div className="detail_grade">
        <div className="detail_text">
          <p onClick={() => navigate("/grade")}>
            더 자세한 등급의 혜택과 달성치 알아보러가기 ▶
          </p>
        </div>
      </div>
    </GradeComp>
  );
}
