import styled from "styled-components";
import backImage from "../../images/1749788315496.jpg";
//등급 안내 페이지
export default function Grade() {
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
          <div className="grade_list">
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
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
      padding: 20px;
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
        padding: 30px 0 30px 70px;
        border: 1px solid #ddd;
        width: 500px;
        border-radius: 0 70px 70px 0;
        background-color: #ffffe7;
        border: none;
        box-shadow: 3px 3px 3px #fcfcb8;
      }
      .grade_list {
        width: 100%;
        height: 500px;
        background-color: #ccc;
        display: flex;
        align-items: end;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          li {
            width: 200px;
            background-color: #fcfcb8;
          }
          li:nth-child(1) {
            height: 150px;
          }
          li:nth-child(2) {
            height: 200px;
          }
          &:nth-child(1) {
            height: 150px;
          }
          &:nth-child(1) {
            height: 150px;
          }
          &:nth-child(1) {
            height: 150px;
          }
        }
      }
    }
  }
`;
