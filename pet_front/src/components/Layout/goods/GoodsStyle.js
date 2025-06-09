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
      padding: 50px;

      .left {
        // background-color: aqua; /* ~~~~~ TEST 용 ~~~~~~ */
        table {
          width: 500px;
          margin: 0 auto;
          margin-top: 30px;
          input {
            width: 200px;
            margin: 10px 0;
          }
          button {
            width: 50px;
            height: 30px;
          }
        }
      }
      .right {
        height: 400px;
        border: 1px solid rgb(230, 230, 230);

        // display: hidden;
        .goodsImg {
          width: 300px;
          height: 300px;
          border: 1px solid rgb(230, 230, 230);
          margin: 20px;
        }
      }
    }
  }
`;
export default GoodsComp;
