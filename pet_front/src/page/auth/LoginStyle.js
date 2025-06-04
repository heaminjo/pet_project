import styled from "styled-components";

const LoginComp = styled.div`
  height: calc(100vh - 140px);
  width: 100%;
  margin-top: 140px;
  .login_inner {
    width: 500px;
    background-color: aliceblue;
    height: 100%;
    margin: 0 auto;
    .login_container {
      padding-top: 130px;
      width: 350px;
      margin: 0 auto;
      h2 {
        margin: 20px 0;
        text-align: start;
      }
      .login_form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 150px;
        input {
          height: 40px;
          width: 100%;
          padding-left: 10px;
        }
        p {
          color: red;
          font-size: 13px;
          font-weight: bold;
        }
      }
      button {
        height: 40px;
        width: 100%;
        background-color: #f8e776;
        border: none;
        cursor: pointer;
      }
    }
  }
`;
export default LoginComp;
