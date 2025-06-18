import styled from 'styled-components';

const GoodsComp = styled.div`
  .container {
    width: 900px;
    height: 500px;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid rgb(230, 230, 230);
    .register-form {
      display: flex;
      flex-direction: row;
      padding: 20px;
      background-color: white; /* ~~~~~ TEST 용 ~~~~~~ */
      .left {
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
        //border: 1px solid rgb(230, 230, 230);
        // display: hidden;
        .goodsImg {
          border: 1px solid rgb(230, 230, 230);
          padding: 20px;
          box-shadow: 5px 5px 10px rgb(175, 175, 175);
          overflow: hidden;
        }
      }
    }
  }
`;
export default GoodsComp;
