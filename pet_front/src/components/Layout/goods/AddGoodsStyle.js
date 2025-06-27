import styled from 'styled-components';

const GoodsComp = styled.div`
  .container {
    width: 900px;
    height: 500px;
    padding: 30px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgb(230, 230, 230);
    .register-form {
      display: flex;
      flex-direction: row;
      padding: 20px;
      background-color: white; /* ~~~~~ TEST 용 ~~~~~~ */
      gap: 40px;
      .left {
        table {
          width: 500px;
          height: 350px;
          margin: 0 auto;
          margin-top: 30px;
          select {
            padding: 6px 10px;
            border-radius: 6px;
          }
          input {
            width: 200px;
            margin: 10px 0;
          }
          .submit-btn,
          .exit-btn {
            width: 70px;
            height: 36px;
            margin-right: 10px;
            background-color: #fbaaaa; /* 변경된 부분 */
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
          }

          .submit-btn:hover,
          .exit-btn:hover {
            background-color: #f89090; /* 변경된 부분 */
          }
        }
      }
      .right {
        width: 320px;
        .goodsImg {
          height: 320px;
          border: 1px solid rgb(230, 230, 230);
          object-fit: cover;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 5px 5px 10px rgb(175, 175, 175);
          overflow: hidden;
        }
      }
    }
  }
`;
export default GoodsComp;
