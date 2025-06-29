import styled from 'styled-components';
const CartComp = styled.div`
  .cart-container {
    width: 90%;
    margin: 0px auto;
    padding: 40px;
    background-color: rgb(248, 246, 246);
    font-family: 'Arial', sans-serif;
    color: #222;
    border-radius: 3px;
    border: 1px solid #ccc;

    .top {
      h2 {
        color: #444;
        font-size: 1.6rem;
        padding: 10px 20px;
        display: inline-block;
        font-weight: bold;
      }
    }

    .body {
      display: flex;
      gap: 20px;

      .left {
        flex: 3;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .prod {
          width: 700px;
          display: flex;
          border: 1px solid #ddd;
          background-color: #fff;
          border-radius: 6px;
          padding: 15px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.2s ease;

          &:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .prodleft {
            display: flex;
            align-items: center;
            gap: 10px;

            input[type='checkbox'] {
              width: 18px;
              height: 18px;
              cursor: pointer;
            }

            .prodimg {
              width: 120px;
              height: 150px;
              object-fit: cover;
              border: 1px solid #ccc;
              border-radius: 6px;
              box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
              cursor: pointer;
            }
            .rating {
            }
          }

          .prodright {
            padding-left: 20px;
            font-size: 14px;
            color: #444;

            div {
              margin: 6px 0;
            }

            b {
              font-weight: bold;
              margin-right: 5px;
            }

            .seller {
              width: 24px;
              vertical-align: middle;
              margin-right: 5px;
            }

            span {
              font-size: 12px;
              color: red;
              margin-left: 10px;
            }
          }
        }
      }

      .right {
        width: 300px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 20px;
        height: fit-content;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        color: #444;

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;

          td {
            padding: 8px 5px;
            font-size: 14px;
          }

          td:first-child {
            font-weight: bold;
          }

          tr:first-child td {
            font-size: 1rem;
            padding-bottom: 12px;
          }
        }

        .buy,
        .cancel {
          width: 100%;
          height: 45px;
          margin: 5px 0;
          font-size: 1rem;
          font-weight: bold;
          border: 1px solid #ccc;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .buy {
          background-color: #ffaaaa;
        }
        .buy:hover {
          background-color: rgb(255, 145, 145);
        }
        .cancel {
          background-color: rgb(238, 234, 234);
        }
        .cancel:hover {
          background-color: rgb(221, 215, 215);
        }
      }
    }
  }
`;

export default CartComp;
