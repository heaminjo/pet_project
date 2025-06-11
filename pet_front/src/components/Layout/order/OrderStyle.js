import styled from 'styled-components';

const OrderComp = styled.div`
  .container {
    width: 900px;
    height: 800px;
    margin: 0 auto;
    margin-top: 150px;
    padding: 0px;
    border-radius: 10px;

    .product {
      display: flex;
      gap: 40px;
      flex-direction: row;
      border: 1px solid #ddd;

      .left {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .prodimg {
          width: 300px;
          height: 300px;
          padding: 10px;
          border: 1px solid #ddd;
          box-shadow: 1px 1px 10px rgb(150, 150, 150);
        }
      }

      .right {
        width: 500px;
        height: 400px;
        padding: 0 50px;

        .prodname {
          margin-top: 50px;

          font-size: larger;
          font-weight: bold;
        }
        .rating {
        }

        .prodprice {
          font-weight: bold;
          font-size: large;
          color: red;
          margin: 10px;
        }

        .prodprice2 {
          font-size: small;
          color: red;
          margin: 10px;
        }

        .sellerimg {
          width: 30px;
          height: 30px;
          align-content: center;
        }
        .options {
          width: 300px;
          height: 30px;
          font-weight: bold;
        }
      }
    }
  }
`;

export default OrderComp;
