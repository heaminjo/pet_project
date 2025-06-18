import styled from 'styled-components';
const CartComp = styled.div`
  .container {
    width: 900px;
    margin: 0px auto;
    padding: 20px;
    background-color: #fffef5;
    font-family: 'Arial', sans-serif;
    color: #222;
    border-radius: 8px;

    .top {
      margin-left: 20px;

      h2 {
        font-size: 1.6rem;
        background-color: #f6e96c;
        padding: 10px 20px;
        display: inline-block;
        border-radius: 6px;
        font-weight: bold;
      }
    }

    .body {
      margin-top: 20px;
      display: flex;
      gap: 20px;

      .left {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .prod {
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
          }

          .prodright {
            flex: 1;
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

            button {
              width: 24px;
              height: 24px;
              border: 1px solid #ccc;
              border-radius: 4px;
              background-color: #f6e96c;
              cursor: pointer;
              font-weight: bold;
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
        flex: 1;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 20px;
        height: fit-content;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

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

        .buy {
          width: 100%;
          height: 45px;
          margin: 5px 0;
          font-size: 1rem;
          font-weight: bold;
          background-color: #f6e96c;
          border: 1px solid #ccc;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .buy:hover {
          background-color: #f1d700;
        }
      }
    }
  }
`;

export default CartComp;
