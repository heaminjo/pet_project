import styled from 'styled-components';

const PayComp = styled.div`
  .container {
    width: 900px;
    height: 1200px;
    margin: 0 auto;
    margin-top: 200px;
    .title {
      height: 50px;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: larger;
      .payment {
        border-top: 1px solid black;
      }
    }
  }

  th {
    width: 150px;
    background-color: rgb(220, 220, 220);
    border-top: 1px solid black;
    border-bottom: 1px solid #ccc;
  }
  td {
    width: 600px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    vertical-align: top;
  }
  .badge {
    color: red;
  }
  .pay {
    width: 300px;
    height: 100px;
    margin: 50px;
    font-size: large;
    background-color: rgb(70, 50, 200);
    color: white;
  }
  .cancel {
    width: 300px;
    height: 100px;
    font-size: large;
  }

  .goodslist {
    display: flex;
    flex-direction: column;
  }
`;

export default PayComp;
