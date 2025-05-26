import styled from "styled-components";

const MyPageComp = styled.div`
  width: 100%;
  margin-top: 150px;
  .mypage_inner {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .main_container {
      width: 100%;
      border: 1px solid #000;
      padding: 20px;
      border: 1px solid #eee;
      box-shadow: 3px 3px 3px #ccc;
      display: flex;
      flex-direction: column;
      gap: 30px;
      .user_info {
        height: 250px;
        width: 100%;
        display: flex;
        gap: 20px;
        .user_profile {
          width: 680px;
          height: 100%;
          border: 1px solid rgb(240, 240, 240);
          box-shadow: 3px 3px 3px #ccc;
          display: flex;
          gap: 20px;
          .image {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 150px;
              height: 150px;
              border-radius: 100%;
            }
          }
          .data {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .user_name {
              font-size: 18px;
              span {
                font-size: 20px;
                font-weight: bold;
              }
            }
            .user_email {
              font-size: 12px;
            }
          }
          .point {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-left: 1px dashed #ccc;

            .point_name {
              flex: 1;
              display: flex;
              align-items: center;
            }
            .print_point {
              flex: 2;
              span {
                font-size: 40px;
              }
            }
          }
        }
        .user_grade {
          width: 250px;
          border: 1px solid rgb(240, 240, 240);
          box-shadow: 3px 3px 3px #ccc;
          .grade_image {
            padding-top: 20px;
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100px;
              border-radius: 100%;
            }
          }
          .grade_text {
            padding: 10px;
            text-align: center;
            .grade_name {
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
      }
      .order_state {
        height: 150px;
        ul {
          width: 700px;
          margin: 0 auto;
          display: flex;
          gap: 30px;
          justify-content: space-between;
          li {
            cursor: pointer;
            width: 150px;
            height: 150px;
            background-color: #eee;
            box-shadow: 1px 1px 1px #ccc;
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            gap: 10px;
            span {
              font-size: 40px;
            }
          }
          li:hover {
            background-color: #ddd;
          }
        }
      }
    } //main_container
  }
`;
export default MyPageComp;
