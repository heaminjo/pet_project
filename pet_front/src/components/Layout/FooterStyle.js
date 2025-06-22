import styled from "styled-components";

const FooterComp = styled.footer`
  .footer {
    background-color: #fef7ec;
    padding: 40px 20px;
    color: #444;
    text-align: center;
    font-family: "Pretendard", sans-serif;
    border-top: 2px solid #f4d19b;
  }

  .footer-content {
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
  }

  .footer h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #d08543;
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
