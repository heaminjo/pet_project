import styled from "styled-components";
import backImage from "../../images/1749788315496.jpg";
import { useContext } from "react";
import { PetContext } from "../../App";
import { useNavigate } from "react-router-dom";
//등급 안내 페이지
export default function Grade() {
  const navigate = useNavigate();
  //내 등급 클릭 시 로그인 여부에따른 이동
  const myGrade = () => {
    if (localStorage.getItem("loginName") != null) {
      navigate("/user/mypage/mygrade");
    } else {
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/login");
    }
  };
  return (
    <GradeComp backImage={backImage}>
      <div className="grade_inner">
        <div className="grade_container">
          <div className="grade_intro">
            <div className="intro_text">
              <h2>⭐몽냥마켓 회원 등급 안내⭐</h2>
              <p>
                우리 몽이, 냥이에게 더 많은 혜택을! 회원 등급에 따라 달라지는
                특별한 혜택을 확인해보세요.
              </p>
            </div>
          </div>
          <div className="description">
            <div className="description_text">
              <p>
                몽냥마켓에서는 회원님들의 방문 이력과 구매 활동에 따라 <br />
                다양한 등급을 제공하고 있어요.
                <br />
                <br />
                등급이 올라갈수록 더 큰 할인과, 풍성한 혜택이 기다리고 있답니다!{" "}
                <br />
                지금 내 등급을 확인하고, 다음 등급 혜택도 미리 알아보세요 🐾
              </p>
            </div>
            <div className="my_grade">
              <h4 onClick={() => myGrade()}>내 등급 보러가기 ▶</h4>
            </div>
          </div>
          <div className="grade_list">
            <h2>등급 및 혜택 소개</h2>
            <ul className="grade_ul">
              <li>
                <div className="grade_title">
                  <h3>새싹 등급</h3>
                  <div className="color_block" id="grade01"></div>
                </div>
                <div className="grade_advantage">
                  <p>혜택 준비중</p>
                </div>
                <div className="grade_condition">
                  <h4>등급 기준</h4>
                  <p>회원 가입</p>
                </div>
              </li>
              <li>
                <div className="grade_title">
                  <h3>초보 회원</h3>
                  <div className="color_block" id="grade02"></div>
                </div>
                <div className="grade_advantage">
                  <p>혜택 준비중</p>
                </div>
                <div className="grade_condition">
                  <h4>등급 기준</h4>
                  <p>누적 방문일 수 3 회 </p>
                  <p>누적 구매 1건</p>
                </div>
              </li>
              <li>
                <div className="grade_title">
                  <h3>중급 회원</h3>
                  <div className="color_block" id="grade03"></div>
                </div>
                <div className="grade_advantage">
                  <p>혜택 준비중</p>
                </div>
                <div className="grade_condition">
                  <h4>등급 기준</h4>
                  <p>누적 방문일 수 5 회 </p>
                  <p>300,00원 이상 구매</p>
                  <p>누적 구매 3건</p>
                </div>
              </li>
              <li>
                <div className="grade_title">
                  <h3>상급 회원</h3>
                  <div className="color_block" id="grade04"></div>
                </div>
                <div className="grade_advantage">
                  <p>혜택 준비중</p>
                </div>
                <div className="grade_condition">
                  <h4>등급 기준</h4>
                  <p>누적 방문일 수 10 회 </p>
                  <p>100,000원 이상 구매</p>
                  <p>누적 구매 10건</p>
                </div>
              </li>
              <li>
                <div className="grade_title">
                  <h3>프리미엄 회원</h3>
                  <div className="color_block" id="grade05"></div>
                </div>
                <div className="grade_advantage">
                  <p>혜택 준비중</p>
                </div>
                <div className="grade_condition">
                  <h4>등급 기준</h4>
                  <p>누적 방문일 수 20 회 </p>
                  <p>300,000원 이상 구매</p>
                  <p>누적 구매 15건</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GradeComp>
  );
}
const GradeComp = styled.div`
  margin-top: 150px;

  .grade_inner {
    width: 1220px;
    margin: 0 auto;
    padding: 50px 0;
    .grade_container {
      border: 2px solid #999;
      border-radius: 20px;
      box-shadow: 3px 3px 3px #ccc;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 50px;
      .grade_intro {
        width: 100%;
        border-radius: 100px;
        margin: 0 auto;
        height: 200px;
        background-color: #fff;
        margin-top: 80px;
        .intro_text {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 130px;
          font-weight: bold;
          h2 {
            font-size: 45px;
          }
        }
      }
      .description {
        display: flex;
        .description_text {
          padding: 30px 0 30px 70px;
          border: 1px solid #ddd;
          width: 500px;
          border-radius: 0 70px 70px 0;
          background-color: #ffffe7;
          border: none;
          box-shadow: 3px 3px 3px #fcfcb8;
        }
        .my_grade {
          font-size: 20px;
          margin-left: 30px;
          display: flex;
          align-items: end;
          cursor: pointer;
        }
      }
      .grade_list {
        width: 100%;
        height: 600px;
        padding: 0 20px;
        h2 {
          padding: 40px 0;
        }
        .grade_ul {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          li {
            width: 200px;
            height: 500px;
            border: 1px solid #aaa;
            box-shadow: 2px 2px 2px #aaa;
            .grade_title {
              text-align: center;
              padding: 20px 0;
              h3 {
                margin-bottom: 20px;
              }
              .color_block {
                width: 180px;
                margin: 0 auto;
                height: 15px;
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
            .grade_advantage {
              display: flex;
              flex-direction: column;
              text-align: center;
              width: 100%;
              height: 200px;
              border-bottom: 3px dashed #ccc;
            }
            .grade_condition {
              display: flex;
              flex-direction: column;
              gap: 10px;
              text-align: center;
              h4 {
                margin: 20px 0;
              }
            }
          }
        }
      }
    }
  }
`;
