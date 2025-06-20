import { FiAlertTriangle } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Error() {
  const location = useLocation();
  const message = location.state?.message;
  const navigate = useNavigate();
  return (
    <ErrorComp>
      <div className="error_inner">
        <div className="error_container">
          <h1>{message}</h1>
          <div className="icon_">
            <FiAlertTriangle />
            <button onClick={() => navigate("/")}>메인페이지로 ▶</button>
          </div>
        </div>
      </div>
    </ErrorComp>
  );
}
const ErrorComp = styled.div`
  margin-top: 150px;
  height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  background-color: #323232;
  .error_inner {
    width: 800px;
    margin: 0 auto;
    .error_container {
      text-align: center;
      background-color: #ddd;
      height: 500px;
      border-radius: 100%;
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      h1 {
        margin: 10px 0;
      }
      .icon_ {
        display: flex;
        flex-direction: column;
        align-items: center;
        svg {
          font-size: 200px;
          color: red;
        }
        button {
          height: 50px;
          width: 120px;
          border: none;
          background-color: #000;
          color: #fff;
          font-weight: bold;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
  }
`;
