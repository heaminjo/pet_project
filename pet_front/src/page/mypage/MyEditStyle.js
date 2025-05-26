import styled from "styled-components";

const MyEditComp = styled.div`
  width: 100%;
  margin-top: 150px;
  .myedit_inner {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .main_container {
      width: 950px;
      height: 300px;
      order: 1px solid #000;
      padding: 20px;
      border: 1px solid #eee;
      box-shadow: 3px 3px 3px #ccc;
      h3 {
        padding: 10px 0;
      }
      .form_container {
        display: flex;
        width: 700px;
        justify-content: space-around;
        gap: 30px;
      }
      table {
        padding: 40px 0;
        tr {
          th {
            text-align: start;
            width: 100px;
          }
          height: 50px;
          input {
            height: 40px;
            width: 250px;
            padding-left: 10px;
          }
        }
      }
      .btn_box {
        padding: 40px 0;
        display: flex;
        gap: 10px;
        align-items: end;
        button {
          width: 150px;
          height: 40px;
          background-color: #ffaaaa;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
        }
      }
      .pw_btn_box {
        padding: 40px 0;
        display: flex;
        gap: 10px;

        button {
          width: 150px;
          height: 40px;
          background-color: #ffaaaa;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    } //main_container
  }
`;
export default MyEditComp;
