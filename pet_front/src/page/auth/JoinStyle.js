const { default: styled } = require("styled-components");

const JoinComp = styled.div`
  margin-top: 140px;
  width: 100%;
  /* background-color: #f8e776; */
  .join_inner {
    width: 700px;
    height: 100%;
    margin: 0 auto;
    /* background-color: #fff; */
    @media (max-width: 767px) {
      width: 90%;
    }
    .join_container {
      padding: 150px 50px 50px;
      h2 {
        text-align: center;
      }
      table {
        margin-top: 30px;
        /* width: 100%; */
        tbody {
          display: flex;
          flex-direction: column;
          gap: 40px;
          tr {
            position: relative;
            th {
              width: 150px;
              text-align: left;
              @media (max-width: 767px) {
                display: none;
              }
            }
            td {
              input {
                width: 350px;
                height: 40px;
                padding-left: 10px;
                @media (max-width: 767px) {
                  width: 90%;
                }
              }
              ul {
                display: flex;
                flex-direction: column;
                gap: 10px;
                #post {
                  display: flex;
                  justify-content: space-between;
                  input {
                    width: 240px;
                    /* @media (max-width: 767px) {
                      width: 80%;
                    } */
                  }
                }
              }
              .error_message {
                color: red;
                font-size: 13px;
                font-weight: bold;
                position: absolute;
              }
              #email_btn {
                position: absolute;
                right: 3px;
                height: 42px;
                width: 90px;
                background-color: #f8e776;
                border: none;
                cursor: pointer;
                color: #fff;
                font-weight: bold;
                border-radius: 10px;
                box-shadow: 3px 3px 3px #aaa;
              }
            } //td
            #email {
              width: 250px;
            }
            #td_email {
            }
          } //tr
          #tr_btn {
            display: flex;
            gap: 20px;
            .btn {
              width: 250px;
              height: 40px;
              border: none;
              border-radius: 10px;
              cursor: pointer;
            }
          }
          #gender {
            td {
              width: 180px;
              height: 40px;
              text-align: center;
              border: 1px solid #000;
            }
            label {
              display: block;
              cursor: pointer;
              height: 100%;
              line-height: 40px;
              input {
                display: none;
              }
            }
          }
        } //tdody
      } //table
      #sub_btn {
        background-color: #f8e776;
      }
      #post_btn {
        padding: 0 10px;
      }
    } //join_container
  } //join_inner
`;
export default JoinComp;
