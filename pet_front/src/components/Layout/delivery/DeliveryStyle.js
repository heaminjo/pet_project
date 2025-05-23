import styled from 'styled-components';

const DeliveryComp = styled.header`
  .container {
    margin: 0 auto;
    margin-top: 150px;
    width: 900px;
    height: 1200px;
    display: flex;
    flex-direction: column;
    .title {
      font-weight: bold;
      font-size: 24px;
    }

    .box1 {
      width: inherit;
      height: 200px;
      margin: 30px 0 50px 0;
      line-height: 200px;
      text-align: center;
      border: 1px solid #ddd;
    }
    .info {
      display: flex;
      flex-direction: row;
      .deliver {
        width: 400px;
        margin: 50px;
        display: flex;
        flex-direction: row;
        .deliverimg {
          width: 100px;
          margin: 10px;
          border: 1px solid #ddd;
        }
        .deliverinfo {
        }
      }
      .user {
        .userinfo {
          width: 300px;
          margin: 50px;
        }
      }
    }
    .desc {
      margin-top: 50px;
      .faq {
        width: inherit;
        height: 50px;
        line-height: 50px;
        padding: 0 50px;
        border: 1px solid #ddd;
      }
    }
  }
`;
export default DeliveryComp;
