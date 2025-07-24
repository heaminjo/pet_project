import styled from 'styled-components';

const FooterComp = styled.footer`
  max-width: 1920px;

  .footer {
    background-color: rgb(241, 236, 236);
    border-top: 1px solid rgb(180, 169, 169);
    padding: 40px 20px;
    color: #444;
    text-align: center;
    font-family: 'Pretendard', sans-serif;
    border-top: 1px solidrgb(128, 123, 123);
  }

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 60px;
        cursor: pointer;
      }
    }
  }

  .footer h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: rgb(129, 118, 118);
  }

  .footer p {
    margin: 8px 0;
    font-size: 16px;
  }

  .footer-team {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }

  .footer-team li {
    margin-bottom: 5px;
    font-size: 15px;
  }

  .footer-copy {
    font-size: 14px;
    color: #888;
    margin-top: 20px;
  }
`;
export default FooterComp;
