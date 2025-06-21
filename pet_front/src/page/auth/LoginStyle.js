import styled from "styled-components";

const LoginComp = styled.div`
  height: calc(100vh - 140px);
  width: 100%;
  margin-top: 140px;
  .login_inner {
    width: 500px;
    height: 100%;
    margin: 0 auto;
    padding-top: 100px;
    .login_container {
      padding-top: 130px;
      width: 350px;
      margin: 0 auto;
      border: 1px solid #eee;
      box-shadow: 2px 2px 2px #ccc;
      padding: 40px;
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
      .login_btn {
        display: flex;
        flex-direction: column;
        gap: 10px;
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
    }
  }
`;
export default LoginComp;
