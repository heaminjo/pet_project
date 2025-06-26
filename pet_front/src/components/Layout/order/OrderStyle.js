import styled from 'styled-components';

const OrderComp = styled.div`
  padding: 30px 0;
  .container {
    width: 900px;
    margin: 0 auto;
    margin-top: 150px;
    padding: 0px;
    border-radius: 10px;

    .product {
      display: flex;
      flex-direction: row;
      border: 1px solid #ddd;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);

      .left {
        width: 400px;
        padding: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .prodimg {
          width: 300px;
          height: 300px;
          padding: 10px;
          border: 1px solid #ddd;
          box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
        }
      }

      .right {
        width: 700px;
        height: 300px;
        padding: 30px;
        gap: 12px;

        .prodname {
          margin-top: 50px;
          font-size: larger;
          font-weight: bold;
        }
        .info-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          padding: 1px;

          label {
            min-width: 100px; /* 라벨 너비 고정 */
            font-weight: bold;
            font-size: 16px;
          }
          .inventory {
            margin: 5px 0px 5px 20px;
          }
          input {
            width: 80px;
            height: 26px;
            padding: 4px;
            font-size: 14px;
            margin-left: 50px;
          }

          .sellerimg {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            margin-left: 50px;
          }
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
        .btn1,
        .btn2 {
          width: 120px;
          height: 40px;
          padding: 10px;
          border-radius: 4px;
        }
        .btn1 {
          border: 1px solid #ccc;
          background: #fff;
          color: #222;
        }
        .btn1:hover {
          background: rgb(255, 145, 145);
        }
        .btn2 {
          background: #ffaaaa;
        }
        .btn2:hover {
          background: rgb(255, 145, 145);
        }
      }
    }
    .product-container {
      padding: 16px;
      font-size: 14px;

      /* 테이블 */
      .product-table {
        width: 100%;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-collapse: collapse;

        .product-th {
          width: 25%;
          text-align: left;
          background-color: #f5f5f5;
          padding: 8px;
          vertical-align: top;
          padding-left: 30px;
        }

        .product-td {
          padding: 8px;
          border-top: 1px solid #eee;
        }
        modal {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }

      /* 더보기 텍스트 */
      .product-more {
        margin-top: 8px;
        font-size: 13px;
        color: #0073e9;
        cursor: pointer;
      }

      .product-more:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default OrderComp;
