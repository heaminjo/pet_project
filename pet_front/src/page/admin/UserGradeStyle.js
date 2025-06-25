import styled from "styled-components";

const UserGradeComp = styled.div`
  #grade01 {
    background-color: #eaefef;
  }
  #grade02 {
    background-color: #d2d7d9;
  }
  #grade03 {
    background-color: #bfb6b2;
  }
  #grade04 {
    background-color: #a69390;
  }
  #grade05 {
    background-color: #847c7a;
  }
  h2 {
    margin-bottom: 20px;
    color: #333;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* 살짝 반사 느낌 */
  }
  width: 100%;
  .grade_intro {
    width: 90%;
    position: relative;
    display: flex;
    .chart {
      border: none;
      position: absolute;
      width: 230px;
      height: 250px;
      background-color: #fff;
      border-radius: 0 100% 100% 0;
      top: -5px;
      left: -20px;
    }
    .line {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      li {
        text-align: end;
        padding-right: 10px;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        box-shadow: 1px 1px 1px 1px #888;
        cursor: pointer;
        span {
          color: #333; /* 어두운 회색 - 순수한 검정보다는 덜 부담스러움 */
          font-weight: 500; /* 기본보다 약간 진하게 */
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* 살짝 반사 느낌 */
          font-weight: bold;
        }
      }
    }
  }
  .grade_table {
    width: 90%;
    padding: 30px 0;
    table {
      border-collapse: collapse;
      width: 100%;
      text-align: center;
      tr {
        height: 50px;
        th {
          height: 40px;
          background-color: #847c7a;
          color: #fff;
          text-shadow: 1px 1px 1px #ccc;
        }
        td {
          border-bottom: 1px solid #ccc;
          padding-left: 5px;
        }
        td:nth-child(1) {
          width: 150px;
        }
        td:nth-child(2) {
          width: 50px;
        }
      }
    }
  }
  .list_table {
    width: 90%;
    height: 350px;
    h4 {
      margin: 10px 0;
    }
    ul {
      width: 100%;
      display: flex;
      gap: 10px;
      li {
        width: 100px;
        height: 50px;
        font-size: 14px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        span {
          color: #333; /* 어두운 회색 - 순수한 검정보다는 덜 부담스러움 */
          font-weight: 500; /* 기본보다 약간 진하게 */
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* 살짝 반사 느낌 */
          font-weight: bold;
        }
      }
      li:hover {
        font-size: 15px;
      }
    }
    table {
      margin-top: 10px;
      width: 100%;
      text-align: center;
      border-collapse: collapse;
      tr {
        height: 40px;
        position: relative;
        td {
          border-bottom: 1px solid #ccc;
        }
        td:nth-child(1) {
          width: 50px;
        }
        td:nth-child(2) {
          width: 300px;
        }
        td:nth-child(3) {
          width: 100px;
        }
        td:nth-child(4) {
          width: 100px;
        }
        td:nth-child(5) {
          width: 100px;
        }
        .btn_td {
          button {
            height: 30px;
            width: 70px;
            border: none;
            background-color: lightslategrey;
            border-radius: 20px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
export default UserGradeComp;
