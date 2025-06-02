import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function WithDrawalComplete() {
  const CompleteComp = styled.div`
    margin-top: 160px;
    height: calc(100vh - 160px);

    .complete_inner {
      border: 2px solid #000;
      width: 800px;
      height: 550px;
      margin: 0 auto;
      text-align: center;
      background-color: rgb(245, 242, 219);
      .complete_container {
        padding: 100px 0;
        display: flex;
        flex-direction: column;
        gap: 50px;
        .service_btn {
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          ul {
            display: flex;
            gap: 30px;
            li {
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }
  `;

  const navigate = useNavigate();
  return (
    <CompleteComp>
      <div className="complete_inner">
        <div className="complete_container">
          <h2>탈퇴가 정상적으로 완료되었습니다.</h2>
          <p>
            몽냥 마켓 서비스를 이용해주셔서 감사합니다. <br />
            당신의 재가입을 언제든지 환영합니다.
          </p>
          <div className="service_btn">
            <ul>
              <li>
                <span onClick={() => navigate("/")}>메인페이지로 이동</span>
              </li>
              <li>
                <span onClick={() => navigate("/join")}>회원가입</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CompleteComp>
  );
}
