

const { default: styled } = require("styled-components");

const boardListContainer = styled.div`
  margin-top: 150px;
    table {
      width: 60%; 
      margin-Left: auto;
      margin-Right: auto;
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
              width: 80px;
              height: 30px;
              font-size: 18px;
              width: 100px;
              height: 40px;
              border: none;
              border-radius: 10px;
              cursor: pointer;
              background-color: #f8e776;
            }
          }
        }    
      } //tbody 
    } //table
  .center {
  text-align: center;
  }
`;
export default boardListContainer;