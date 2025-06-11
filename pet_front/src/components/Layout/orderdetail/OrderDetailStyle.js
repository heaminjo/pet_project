import styled from 'styled-components';

const OrderDetailComp = styled.div`
  .container {
    width: 900px;
    height: 800px;
    margin: 0 auto;

    .orderlist {
      // border: 1px solid rgb(200, 200, 200);
      .ordertitle {
        //border: 1px solid rgb(200, 200, 200);
        font-weight: bold;
        font-size: larger;
      }

      .orderlist2 {
        width: inherit;
        height: 150px;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .orderdesc {
          width: 100%;
          height: 150px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border: 1px solid rgb(200, 200, 200);
          margin: 10px 0;
          padding: 20px;
          box-sizing: border-box; /* 패딩 포함한 width로 계산 */

          .prodimg {
            width: 150px;
            height: 100px;
          }
          .proddesc {
            width: 500px;
            margin: 10px 50px;
          }
          .btn {
            width: 150px;
            display: flex;
            flex-direction: column;

            .btn1,
            .btn2,
            .btn3 {
              height: 30px;
              margin: 3px;
            }
          }
        }
      }
    }
  }
`;
export default OrderDetailComp;
