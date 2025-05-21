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
      h2 {
        margin: 20px 0;
        text-align: center;
      }
      table {
        margin: 0 auto;
        tr {
          height: 50px;
          input {
            height: 35px;
            width: 360px;
            padding-left: 10px;
          }
        }
      }
    }
  }
`;
export default LoginComp;
