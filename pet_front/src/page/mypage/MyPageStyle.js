import styled from 'styled-components';

const MyPageComp = styled.div`
  width: 100%;
  margin-top: 150px;
  .mypage_inner {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .side_menu {
      width: 300px;
      padding: 15px 10px;
      background-color: rgb(255, 251, 195);
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 3px 3px 3px #ccc;
      .sub_menu {
        background-color: #fff;
        .menu_title {
          background-color: #f8e776;
          font-size: 17px;
          font-weight: bold;
          padding: 5px;
          color: rgb(86, 82, 57);
        }
        ul {
          padding: 10px;
          li {
            span {
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .main_container {
      width: 100%;
      border: 1px solid #000;
    }
  }
`;
export default MyPageComp;
