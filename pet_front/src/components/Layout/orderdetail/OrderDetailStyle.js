import styled from 'styled-components';

const OrderDetailComp = styled.div`
  .container {
    width: 900px;
    height: 800px;
    margin: 0 auto;
    margin-top: 50px;
    padding: 150px;

    .ordertitle {
      font-weight: bold;
      font-size: larger;
    }

    .orderlist {
      width: inherit;
      height: 200px;
      padding: 10px;
      border: 1px solid rgb(200, 200, 200);
      display: flex;
      flex-direction: row;
      justify-content: center;

      .orderdesc {
        display: flex;
        flex-direction: row;
        align-items: center;

        .prodimg {
          width: 150px;
          height: 150px;
        }
        .proddesc {
          width: 350px;
          margin: 10px 50px;
        }
        .btn {
          width: 200px;
          display: flex;
          flex-direction: column;
        }
        .btn1,
        .btn2,
        .btn3 {
          margin: 3px;
          padding: 10px;
        }
      }
    }
  }
`;
export default OrderDetailComp;
