import styled from 'styled-components';

const GoodsComp = styled.div`
  .container {
    width: 900px;
    height: 1200px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 150px;
    border: 1px solid rgb(230, 230, 230);
    // background-color: aqua; /* ~~~~~ TEST 용 ~~~~~~ */
    .register-form {
      display: flex;
      flex-direction: row;
      height: 900px;

      .left {
        table {
          width: 500px;
          margin: 0 auto;
          margin-top: 30px;
          input {
            margin: 10px 0;
          }
        }
      }
      .right {
        width: 200px;
        height: 300px;
        display: hidden;
      }
    }
  }
`;
export default GoodsComp;
