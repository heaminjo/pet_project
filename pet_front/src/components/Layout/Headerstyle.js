import styled from "styled-components";

const HeaderComp = styled.header`
  width: 100%;
  max-width: 1920px;
  height: 100px;
  position: fixed;
  z-index: 10000;
  top: 0;
  background-color: #fffdf6;
  @media (max-width: 767px) {
    background-color: #c1b7b3;
    border-bottom: 2px solid #000;
  }
  .header_inner {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 767px) {
      width: 90%;
      h1 {
        font-size: 25px;
      }
    }

    .popup {
      position: fixed;
      top: 300px;
      left: 780px;
      background-color: #cbcec7;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-radius: 20px;
      .popup_btn {
        display: flex;
        justify-content: end;

        svg {
          font-size: 40px;
          cursor: pointer;
        }
      }
      .box {
        padding: 10px;
        width: 300px;
        height: 110px;
        border-radius: 10px;
        background-color: #fffdf6;
        text-align: center;
        h3 {
          margin: 10px 0;
        }
        table {
          text-align: start;
          padding: 10px;

          tr {
            th {
              width: 100px;
              text-align: start;
            }
            td {
              font-weight: bold;
            }
          }
        }
      }
    }

    h1 {
      margin: 0;
      line-height: 100px;
      cursor: pointer;
    }
    .member_menu {
      display: flex;
      font-size: 13px;
      font-weight: bold;
      gap: 10px;
      .login {
        display: flex;
        gap: 10px;
        line-height: 150px;
        span {
          cursor: pointer;
        }
      }
      .max_sign {
        display: flex;
        gap: 10px;
        line-height: 150px;
        @media (max-width: 767px) {
          display: none;
        }
        span {
          cursor: pointer;
        }
        span:last-child {
          font-size: 15px;
        }
      }
      .min_sign {
        display: none;
        height: 100%;
        position: relative;
        span {
          font-size: 40px;
          line-height: 110px;
          height: 100%;
          margin: 0 10px;
          cursor: pointer;
          p {
            font-size: 11px;
            position: absolute;
            bottom: 0;
          }
        }
        @media (max-width: 767px) {
          display: block;
        }
      }
    }
  }
`;
export default HeaderComp;
