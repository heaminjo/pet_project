import styled from 'styled-components';

const CartComp = styled.div`
  .container {
    width: 900px;
    height: 1200px;
    padding: 10px;
    margin: auto;
    margin-top: 150px;
    border: 1px solid rgb(230, 230, 230);
    display: flex;
    flex-direction: column;

    .top {
      margin-top: 0px;
      margin-left: 50px;
    }
    .body {
      width: 800px;
      height: 900px;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      flex-direction: row;
      border: 1px solid rgb(230, 230, 230);

      .left {
        width: 500px;
        height: 200px;
        padding: 10px;
        border: 1px solid rgb(230, 230, 230);
        display: flex;
        flex-direction: row;
        justify-content: center;

        .prodleft {
          width: 200px;
          height: 200px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .cartimage {
            width: 120px;
            height: 150px;
          }
        }
        .prodright {
          width: 300px;
          .seller {
            width: 30px;
            vertical-align: middle;
            background-color: aqua; /* ~~~~~ TEST 용 ~~~~~~ */
          }
        }
      }

      .right {
        width: 300px;
        height: 500px;

        display: flex;
        flex-direction: column;
        table {
          margin-left: 20px;
        }

        .buy {
          width: 250px;
          height: 50px;
          margin: 20px auto;
        }
      }
    }
  }
`;
export default CartComp;
