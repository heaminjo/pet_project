import styled from 'styled-components';

const DeliveryComp = styled.header`
  .container {
    width: 900px;
    margin: 40px auto;
    padding: 40px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
    background: #f8f6f6;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  .title {
    font-size: 2rem;
    font-weight: 700;
    color: #3b3b3b;
    margin-bottom: 32px;
    border-left: 6px solidrgb(216, 238, 255);
    padding-left: 14px;
  }

  .box1 {
    background: rgb(255, 255, 255);
    border: 1px solidrgb(255, 231, 231);
    padding: 24px;
    font-size: 1rem;
    line-height: 1.8;
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 36px;
  }

  .infotitle {
    font-size: 1.4rem;
    font-weight: 600;
    color: #3b3b3b;
    margin: 24px 0 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid #ddd;
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-bottom: 36px;

    .deliver,
    .user {
      flex: 1;
      background: #fff;
      padding: 24px;
      border-radius: 10px;
      border: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    }

    .deliver {
      display: flex;
      flex: 1.3;
      gap: 16px;

      .deliverimg {
        min-width: 150px;
        min-height: 150px;
        border-radius: 6px;
        border: 1px solid #ccc;
      }

      .deliverinfo {
        font-size: 0.95rem;
        width: 100%;

        td {
          padding: 8px 12px;
          border-bottom: 1px solid #f0f0f0;
        }

        td:first-child {
          font-weight: 600;
          width: 90px;
          color: #333;
        }
      }
    }

    .user {
      .userinfo {
        font-size: 0.95rem;

        td {
          padding: 10px;
        }

        td:first-child {
          font-weight: 600;
          width: 100px;
          color: #444;
        }
      }
    }
  }

  .desc {
    margin-top: 40px;

    .title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #444;
      margin-bottom: 14px;
    }

    .faq {
      padding: 16px 20px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 0.95rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgb(255, 243, 243);
      }
    }
  }

  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 40px 0;
  }
`;

export default DeliveryComp;
