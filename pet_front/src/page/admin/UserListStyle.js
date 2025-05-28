import styled from "styled-components";

const UserListComp = styled.div`
  width: 100%;
  margin-top: 150px;
  .list_inner {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .list_container {
      width: 100%;
      border: 1px solid #000;
      padding: 20px;
      border: 1px solid #eee;
      box-shadow: 3px 3px 3px #ccc;
      h3 {
        padding-bottom: 10px;
      }
      .search {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .search_input {
          position: relative;
          input {
            height: 40px;
            width: 350px;
            border-radius: 20px;
            border: 1px solid #000;
          }
          input:focus {
            outline: none;
          }
          button {
            width: 60px;
            height: 100%;
            right: 0px;
            cursor: pointer;
            position: absolute;
            border: none;
            color: #fff;
            border-radius: 0 20px 20px 0;
            background-color: #000;
          }
        }
        .search_type {
          select {
            height: 40px;
            width: 100px;
            option {
              width: 100px;
            }
          }
        }
      }
      table {
        width: 100%;
        border-collapse: collapse;
        tr {
          height: 30px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          th {
            background-color: rgb(255, 221, 0);
            color: rgb(52, 45, 1);
          }
          td {
            padding: 0 5px;
            font-size: 14px;
          }
        }
        tr:hover {
          background-color: #eee;
        }
      }
    }
  }
`;
export default UserListComp;
