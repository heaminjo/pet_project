import styled from 'styled-components';
const DeliveryComp = styled.header`
  .container {
    width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #222;
    background-color: #fffef5;
    border-radius: 8px;

    .title {
      font-weight: bold;
      font-size: 1.6rem;
      background-color: #f6e96c;
      padding: 10px 20px;
      display: inline-block;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .box1 {
      font-size: 1rem;
      background-color: #f1f1f1;
      color: #333;
      height: auto;
      padding: 30px;
      line-height: 1.8;
      margin-bottom: 40px;
      border: 1px solid #ddd;
      border-radius: 6px;
      text-align: center;
    }

    .infotitle {
      font-weight: bold;
      font-size: 1.2rem;
      background-color: #f6e96c;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .info {
      display: flex;
      gap: 40px;
      margin-bottom: 30px;

      .deliver {
        flex: 1;
        display: flex;
        gap: 20px;
        align-items: flex-start;

        .deliverimg {
          width: 150px;
          margin: 10px;
          height: auto;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .deliverinfo {
          font-size: 0.95rem;

          td {
            padding: 6px 10px;
            border-bottom: 1px solid #eee;
          }

          td:first-child {
            font-weight: bold;
            width: 80px;
          }
        }
      }

      .user {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;

        .userinfo {
          width: 80%;
          font-size: 0.95rem;

          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;

          td {
            padding: 6px 10px;
          }

          td:first-child {
            font-weight: bold;
            width: 80px;
          }
        }
      }
    }

    .desc {
      margin-top: 40px;

      .title {
        font-size: 1.2rem;
        background-color: transparent;
        padding: 0;
        margin-bottom: 10px;
      }

      .faq {
        padding: 14px 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 10px;
        font-size: 0.95rem;
      }
    }
  }
`;

export default DeliveryComp;
