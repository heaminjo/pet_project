import { useEffect } from "react";
import { FaMedal } from "react-icons/fa";
import { PiDogFill, PiSneakerMoveFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Upgrade() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const grades = [
    { name: "새싹회원", color: "#eaefef" },
    { name: "초급회원", color: "#ffe99a" },
    { name: "중급회원", color: "#ffd586" },
    { name: "상급회원", color: "#ffaaaa" },
    { name: "프리미엄 회원", color: "#ff9898" },
  ];
  const grade = grades?.find((g) => g.name === location.state?.nextGrade);

  return (
    <UpgradeComp>
      <div className="upgrade_inner">
        <h1>
          축하드립니다 ! <br />
          등급이 업그레이드 되었습니다
        </h1>
        <div className="grade_">
          <h2>
            <FaMedal style={{ color: grade.color }} />
          </h2>
          <h3>{location.state?.nextGrade}</h3>
          <div className="move">
            <p onClick={() => navigate("/user/mypage/mygrade")}>
              내 등급 확인하러가기
              <span>
                <PiSneakerMoveFill />
              </span>
            </p>
          </div>
        </div>
      </div>
    </UpgradeComp>
  );
}
const UpgradeComp = styled.div`
  margin-top: 150px;
  height: calc(100vh - 150px);
  .upgrade_inner {
    width: 700px;
    padding: 60px 0;
    margin: 0 auto;
    height: 100%;
    h1 {
      padding: 20px 0;
      text-align: center;
      border-bottom: 2px solid #000;
      position: relative;
      span {
        font-size: 50px;
        position: absolute;
      }
    }

    @keyframes oper {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .grade_ {
      animation: oper 2s alternate forwards 1s;
      opacity: 0;
      h2 {
        font-size: 150px;
        text-align: center;
      }
      h3 {
        text-align: center;
        font-size: 40px;
      }

      @keyframes move {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .move {
        opacity: 0;
        animation: move 2s forwards 3s;
        display: flex;
        justify-content: end;
        p {
          font-size: 16px;
          font-weight: bold;
          background-color: #000;
          width: 180px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 20px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
`;
