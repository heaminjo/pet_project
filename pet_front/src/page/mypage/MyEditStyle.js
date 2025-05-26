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
      width: 500px;
      order: 1px solid #000;
      padding: 20px;
      border: 1px solid #eee;
      box-shadow: 3px 3px 3px #ccc;
      position: relative;
      h3 {
        padding: 10px 0;
      }
      .form_container {
        width: 500px;
      }
      table {
        padding: 60px 0;
        width: 500px;
        tbody {
          display: flex;
          flex-direction: column;
          gap: 30px;
          tr {
            .error_message {
              color: red;
              font-size: 12px;
              margin-left: 155px;
            }
            th {
              text-align: start;
              width: 150px;
            }
            td {
              border-bottom: 1px solid #000;

              input {
                height: 40px;
                width: 250px;
                padding-left: 10px;
                border: none;
              }
              input:focus {
                outline: none;
              }
            }
          }
        }
      }
      .btn_box {
        padding: 40px 0;
        display: flex;
        gap: 10px;
        position: absolute;
        bottom: 10px;
        left: 130px;
        button {
          width: 130px;
          height: 40px;
          background-color: #ffaaaa;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
        }
        #reset_btn {
          // 취소 버튼
          background-color: #ccc;
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
