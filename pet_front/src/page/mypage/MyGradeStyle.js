import styled from "styled-components";

const GradeComp = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .grade_info {
    height: 250px;
    width: 100%;
    display: flex;
    border-radius: 20px;
    box-shadow: 3px 3px 3px#ccc;
    .my_grade {
      width: 500px;
      display: flex;
      border-right: 3px dashed #666;
      padding: 30px;
      .grade_name {
        width: 250px;
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
      width: 400px;
      text-align: center;
      padding: 20px;
    }
  }
  .grade_graph {
    position: relative;
    width: 1000px;
    height: 200px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    ul {
      display: flex;
      width: 100%;
      li {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 200px;
        text-align: center;
        align-items: end;
        span {
          margin-right: 70px;
        }
        .my {
          font-weight: bold;
        }
        .color_bar {
          height: 10px;
          width: 80px;
          margin-right: 60px;
        }
        .tab {
          width: 25px;
          height: 25px;
          background-color: #fff;
          border: 2px solid #000;
          z-index: 10;
          border-radius: 100%;
        }
      }
    }
    .gauge {
      position: absolute;
      bottom: 73px;
      background-color: #fff;
      border: 1px solid #000;
      height: 10px;
      border-radius: 10px;
    }
    .active {
      background-color: #fff;
      width: 1000px;
      border: 1px solid #000;
    }
    .back {
      width: ${(props) => (props.data.width ? props.data.width : 0)};
      background-color: #666;
    }
  }
  .next_grade {
    width: 1000px;
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
      width: 500px;
      h3 {
        text-align: center;
        margin-bottom: 50px;
      }
      ul {
        display: flex;
        justify-content: center;
        gap: 30px;
        li {
          width: 200px;
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
    margin-top: 50px;

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
