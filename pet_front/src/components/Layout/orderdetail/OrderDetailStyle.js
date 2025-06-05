import styled from 'styled-components';

const OrderDetailComp = styled.div`
  .container {
    width: 900px;
    height: 800px;
    margin: 0 auto;
    margin-top: 50px;
    padding: 150px;

    .orderlist {
      border: 1px solid rgb(200, 200, 200);
      .ordertitle {
        border: 1px solid rgb(200, 200, 200);
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
          display: flex;
          flex-direction: row;
          align-items: center;
          border: 1px solid rgb(200, 200, 200);

          .prodimg {
            width: 50px;
          }
          .proddesc {
            width: 350px;
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
