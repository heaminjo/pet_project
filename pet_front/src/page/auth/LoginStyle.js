import styled from "styled-components";

const LoginComp = styled.div`
  height: calc(100vh - 140px);
  width: 100%;
  margin-top: 140px;
  @media (max-width: 767px) {
    margin-bottom: 200px;
  }
  .login_inner {
    width: 500px;
    height: 100%;
    margin: 0 auto;
    padding-top: 100px;

    @media (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
    .login_container {
      padding-top: 130px;
      width: 80%;
      margin: 0 auto;
      border: 1px solid #eee;
      box-shadow: 2px 2px 2px #ccc;
      padding: 40px;
      h2 {
        margin: 20px 0;
        text-align: start;
        text-align: center;
      }
      .login_form {
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 150px;
        margin: 0 auto;
        input {
          height: 40px;
          width: 95%;

          padding-left: 10px;
        }
        p {
          color: red;
          font-size: 13px;
          font-weight: bold;
        }
      }
      .login_btn {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 90%;
        margin: 0 auto;
        button {
          height: 50px;
          width: 100%;
          border-radius: 5px;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }
        img {
          width: 100%;
          height: 50px;
          cursor: pointer;
        }
      }
      .join {
        text-align: center;
        height: 50px;
        line-height: 70px;
        font-size: 14px;
        color: #555;
        span {
          border-bottom: #555;
          cursor: pointer;
        }
      }
    }
  }
`;
export default LoginComp;
