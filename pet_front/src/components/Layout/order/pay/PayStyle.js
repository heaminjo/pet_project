import styled from 'styled-components';

const PayComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    color: #222;
  }
  section {
    .goods {
      display: flex;
      flex-direction: column;
      .prod {
        width: 800px;
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
          padding-left: 30px;
          align-items: center;
          gap: 10px;

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
          padding-left: 50px;
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
  }

  h2 {
    font-size: 1.5rem;
    color: #222;
    margin-bottom: 10px;
  }

  .title {
    font-weight: bold;
    font-size: 1.3rem;
    margin: 10px 20px;
    display: flex;
    align-items: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 0.95rem;
  }

  th {
    width: 150px;
    background-color: #ffaaaa;
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  td {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px;
    padding-left: 30px;

    .addr {
      display: flex;
      flex-direction: column;
      gap: 10px;
      li {
        border: 1px solid #ccc;
        height: 150px;
        display: flex;
        justify-content: space-between;
        box-shadow: 3px 3px 3px #ccc;
        .addr_item {
          display: flex;
          .addr1 {
            display: flex;
            width: 150px;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            border-right: 2px dashed #ccc;
            span {
              margin-top: 30px;
              font-size: 20px;
            }
          }
          .addr2 {
            width: 450px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            font-size: 16px;
          }
        }
        .addr_btn {
          display: flex;
          flex-direction: column;
          width: 100px;
          button {
            height: 100%;
            cursor: pointer;
            border: none;
            font-weight: bold;
          }
          button:nth-child(2) {
            background-color: lightslategrey;
          }
        }
      }
    }
  }

  .badge {
    color: red;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .goodslist {
    margin: 5px 0;
    padding: 8px 12px;
    background-color: #fafafa;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  button {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .pay {
    width: 300px;
    height: 100px;
    margin: 50px 20px 0 0;
    font-size: 1.2rem;
    background-color: #ffaaaa;
    color: #000;
    font-weight: bold;
    border: 1px solid #ccc;
  }
  .pay:hover {
    background-color: rgb(255, 145, 145);
  }

  .cancel {
    width: 300px;
    height: 100px;
    font-size: 1.2rem;
    background-color: rgb(238, 234, 234);
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .cancel:hover {
    background-color: rgb(221, 215, 215);
  }

  input[type='radio'] {
    margin-right: 6px;
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #ddd;
    margin: 10px 0 20px 0;
  }

  .deliver-btn:hover,
  .contact-btn:hover,
  .message-btn:hover {
    background-color: rgb(221, 215, 215);
  }
`;

export default PayComp;
