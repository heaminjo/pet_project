const { default: styled } = require("styled-components");

const JoinComp = styled.div`
  height: 1000px;
  margin-top: 140px;
  width: 100%;
  .join_inner {
    width: 700px;
    height: 100%;
    margin: 0 auto;
    .join_container {
      padding: 150px 50px 50px;
      h2 {
        text-align: center;
      }
      table {
        margin-top: 30px;
        tbody {
          display: flex;
          flex-direction: column;
          gap: 40px;
          tr {
            th {
              width: 150px;
              text-align: left;
            }
            td {
              input {
                width: 350px;
                height: 40px;
                padding-left: 10px;
              }
              ul {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }
              .error_message {
                color: red;
                font-size: 13px;
                font-weight: bold;
                position: absolute;
              }
            } //th
          } //tr
        } //tdody
      } //table
      margin: 0 auto;
    } //join_container
  } //join_inner
`;
export default JoinComp;
