import styled from "styled-components";

const UserDetailComp = styled.div`
  width: 100%;
  margin-top: 150px;
  .detail_inner {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .detail_container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .title {
        height: 80px;
        .back {
          font-size: 13px;
          margin-bottom: 30px;
        }
        h2 {
        }
      }
      .detail {
        display: flex;
        gap: 20px;
        .user_profile {
          width: 300px;
          height: 400px;
          border: 1px solid #ccc;
          box-shadow: 3px 3px 5px #ccc;
          .image {
            width: 100%;
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 200px;
              height: 200px;
              border-radius: 100%;
            }
          }
          .simple_data {
            width: 100%;
            height: 30%;
            line-height: 100px;
            text-align: center;
            p {
              font-size: 25px;
            }
          }
        }
        .user_detail {
          width: 550px;
          display: flex;
          gap: 20px;
          flex-direction: column;

          .basic_data {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            height: 250px;
            box-shadow: 3px 5px 5px 1px #ccc;
            table {
              width: 100%;
              padding: 20px;
              tr {
                height: 35px;
                border-bottom: 1px solid #ccc;
                th {
                  width: 100px;
                  text-align: start;
                }
                td {
                  border-bottom: 1px solid #ccc;
                }
              }
            }
          }
          .sub_data {
            height: 130px;
            display: flex;

            .content {
              text-align: center;
              width: 183px;
              h4 {
                height: 40px;
                line-height: 40px;
                background-color: #999;
                color: #eee;
              }
              span {
                line-height: 50px;
              }
            }
          }
        }
        .admin_tab {
          width: 100px;
          display: flex;
          flex-direction: column;
          justify-content: end;
          gap: 10px;
          li {
            background-color: #ccc;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-radius: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
export default UserDetailComp;
