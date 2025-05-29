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
      width: 900px;
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
            padding-left: 15px;
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
          display: flex;
          gap: 10px;
          select {
            height: 40px;
            width: 100px;
            option {
              width: 100px;
            }
          }
        }
      }
      .list_view {
        height: 380px;
        table {
          width: 880px;
          border-collapse: collapse;
          th {
            background-color: rgb(255, 221, 0);
            color: rgb(52, 45, 1);
            padding: 5px 0;
            text-align: start;
            padding-left: 5px;
          }
          .user_present {
            height: 30px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            td {
              padding: 0 5px;
              font-size: 14px;
            }
          }
          .user_present:hover {
            background-color: #eee;
          }
          .user_empty {
            height: 50px;
            border: 1px solid #eee;
            text-align: center;
          }
        }
      }
      .curr_page {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: end;
        height: 40px;
        margin-top: 10px;
        margin-left: 100px;
        span {
          cursor: pointer;
          font-size: 15px;
          padding: 10px;
          cursor: pointer;
        }
        .current {
          font-weight: bold;
        }
        #last_page {
          margin-left: 40px;
        }
      }
      .page_btn {
        display: flex;
        width: 200px;
        height: 20px;
        gap: 20px;
        justify-content: center;
        margin: 0 auto;
        position: relative;
        padding: 10px 0;
        .move {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          border: none;
          cursor: pointer;
          position: absolute;
        }
        #first {
          left: 0;
        }
        #prev {
          right: 120px;
        }
        #next {
          left: 120px;
        }
        #last {
          right: 0;
        }
      }
    }
  }
`;
export default UserListComp;
