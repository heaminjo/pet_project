const { default: styled } = require("styled-components");

const boardListContainer = styled.div`
  margin-top: 150px;
  height: auto;
  min-height: 1500px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .boardListMenuContainer {
    width: 100%;
    height: 100px;
    margin: 20px 0;
    .boardListMenu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      li {
        margin: 0 20px;
        font-size: 20px;
        font-family: "GmarketSansMedium";
        cursor: pointer;
        padding: 8px 12px;
        transition: background-color 0.3s;
      }
      li:hover {
        background-color: #f8e776;
        border-radius: 4px;
      }
    } //boardListMenu
  } //boardListMenuContainer

  table {
    flex-grow: 1;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    thead {
      tr {
        td {
          font-size: 20px;
          font-weight: bold;
          font-family: "GmarketSansMedium";
        }
      }
    } //thead
    tbody {
      tr {
        td {
          font-size: 18px;
          font-family: "GmarketSansMedium";
          border-bottom: 1px solid #ccc; /* 가로줄만 */
          border-left: none;
          border-right: none;
          border-top: none;
          height: 50px;
        }
      }
      tr {
        td {
          button {
            font-size: 18px;
            width: 100px;
            height: 40px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            background-color: #f8e776;
            border-bottom: none;
          }
        }
      }
      tr:last-child td {
        border-bottom: none;
      }
    } //tbody
  } //table
  .center {
    text-align: center;
  }
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0 0 0;

    select,
    input[type="text"] {
      height: 40px;
      width: 120px; /* 원하는 너비로 맞추세요 */
      font-size: 16px;
      box-sizing: border-box;
      padding: 0 10px;
      border: 1px solid #ccc;
      outline: none;
      background: #fff;
      margin: 0;
      /* 브라우저 기본 스타일 제거 */
      appearance: menulist;
      -webkit-appearance: menulist;
      -moz-appearance: menulist;
    }

    select {
      border-right: none;
      border-radius: 4px 0 0 4px;
      text-align: center;
    }

    input[type="text"] {
      border-left: none;
      border-right: none;
      border-radius: 0;
      width: 300px; /* input은 더 넓게 */
    }

    button {
      height: 40px;
      width: 40px;
      border: 1px solid #ccc;
      border-left: none;
      border-radius: 0 4px 4px 0;
      background: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #222;
      transition: background 0.2s;
      &:hover {
        background: #f8e776;
      }
    }
  }
`;
export default boardListContainer;
