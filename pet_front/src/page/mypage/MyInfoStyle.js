import styled from "styled-components";
import { PiShoppingCartFill } from "react-icons/pi";
const MyInfoComp = styled.div`
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
          svg {
            font-size: 100px;
          }
        }
        .grade_text {
          padding: 10px;
          text-align: center;
          .grade_name {
            font-size: 20px;
            font-weight: bold;
          }
          .grade_detail {
            font-size: 13px;
            cursor: pointer;
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

    .cart_ {
      height: 70px;
      text-align: center;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      @keyframes cartStyle {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      i {
        color: red;
        animation: 1s cartStyle steps(1, start) infinite;
      }
      .cart_icon {
        svg {
          font-size: 20px;
          margin-right: 5px;
        }
        cursor: pointer;
      }
    }
  } //
  .order_ {
    margin-top: 50px;
    h2 {
      span {
        font-size: 13px;
        color: #aaa;
      }
      padding: 10px 0;
    }
    .order_list {
      width: 100%;
      padding: 20px 0;
      ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .order_title {
          display: flex;
          justify-content: space-between;
        }
        li {
          width: 600px;
          height: 200px;
          padding: 20px;
          border: 1px solid #999;
          border-radius: 10px;
          box-shadow: 3px 3px 3px #ccc;
          h4 {
            font-size: 25px;
            margin-bottom: 20px;
          }
          h4:nth-last-child(1) {
            font-size: 17px;
            color: #333;
          }
          .order_data {
            display: flex;
            gap: 20px;
            .image_ {
              img {
                width: 150px;
                height: 150px;
                border-radius: 20px;
              }
            }
            .text_ {
              font-size: 18px;
              width: 300px;
              span {
                font-size: 13px;
                color: #555;
              }
              .detail {
                margin-top: 60px;
                display: flex;
                align-items: center;
                cursor: pointer;
                span {
                  margin: 0;
                  font-size: 16px;
                  color: #000;
                }
              }
            }
            .menu_ {
              display: flex;
              flex-direction: column;
              justify-content: end;
              margin-bottom: 20px;
              gap: 10px;
              button {
                border: none;
                font-weight: bold;
                box-shadow: 2px 2px 2px #555;
                cursor: pointer;
                width: 100px;
                height: 40px;
                background-color: #f8e776;
              }
            }
          }
        }
      }
      .not_goods {
        width: 400px;
        height: 200px;
        padding: 20px;
        border: 1px solid #ccc;
        background-color: #eee;
        box-shadow: 2px 2px 2px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        svg {
          font-size: 100px;
        }
        p {
          font-size: 17px;
        }
        button {
          margin-top: 10px;
          width: 200px;
          height: 30px;
          background-color: #f8e776;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
`;
export default MyInfoComp;
