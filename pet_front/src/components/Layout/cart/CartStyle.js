import styled from 'styled-components';

const CartComp = styled.div`
  .container {
    width: 900px;
    height: 1200px;
    padding: 10px;
    margin: auto;
    border: 1px solid rgb(230, 230, 230);
    display: flex;
    flex-direction: column;

    .top {
      margin-top: 0px;
      margin-left: 50px;
    }
    .body {
      width: 850px;
      height: 900px;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      flex-direction: row;
      border: 1px solid rgb(230, 230, 230);
      .left {
        display: flex;
        flex-direction: column;

        .prod {
          width: 550px;
          padding: 10px;
          border: 1px solid rgb(230, 230, 230);
          display: flex;

          .prodleft {
            width: 200px;
            height: 200px;
            margin-left: 20px;
            overflow: hidden;
            display: flex;
            justify-content: start;
            align-items: center;
            // flex-direction: column;

            .prodimg {
              width: 120px;
              height: 150px;
              padding: 10px;
              border: 1px solid rgb(230, 230, 230);
              box-shadow: 1px 2px 5px 1px rgb(126, 126, 126);
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
          margin: 5px auto;
        }
      }
    }
  }
`;
export default CartComp;
