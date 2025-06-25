import styled from "styled-components";

const GradeComp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  .grade_info {
    height: 250px;
    width: 100%;
    display: flex;
    border-radius: 20px;
    box-shadow: 3px 3px 3px#ccc;
    background-color: rgb(63, 63, 63);
    .my_grade {
      width: 50%;
      display: flex;
      border-right: 3px dashed #666;
      padding: 30px;
      .grade_name {
        width: 250px;
        color: #fff;
        svg {
          font-size: 80px;
        }
      }
      .user_activity {
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 20px;
        border: 1px solid #ccc;
        padding: 10px;
        table {
          tr {
            height: 30px;
            th {
              text-align: start;
              width: 200px;
            }
          }
        }
      }
    }
    .boon {
      width: 50%;
      text-align: center;
      padding: 20px;
      color: #fff;
      .text {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .next_grade {
    width: 100%;
    justify-content: center;
    display: flex;
    justify-content: space-between;
    .upgrade {
      width: 200px;
      height: 200px;
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 2px solid #eee;
      box-shadow: 2px 2px 2px #555;
    }
    .prev {
      background-color: ${(props) =>
        props.data.backColor ? props.data.backColor : 0};
    }
    .upgrade_condition {
      width: 40%;
      h3 {
        text-align: center;
        margin-bottom: 50px;
      }
      ul {
        display: flex;
        justify-content: center;
        gap: 30px;
        li {
          width: 150px;
          padding: 10px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border: 3px solid #000;
          span {
            color: red;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
    .next {
      background-color: ${(props) =>
        props.data.nextColor ? props.data.nextColor : 0};
    }
  }
  .detail_grade {
    display: flex;
    justify-content: end;

    .detail_text {
      height: 80px;
      border: 1px solid #ccc;
      font-size: 18px;
      line-height: 80px;
      padding: 20px;
      box-shadow: 3px 3px 3px #ccc;
      cursor: pointer;
    }
  }
`;
export default GradeComp;
