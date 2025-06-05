const { default: styled } = require("styled-components");

const boardDetailContainer = styled.div`
  margin-top: 200px;
  height: 1000px;
  width: 100%;
  .boardDetailContainer {
    div {
      button {
        font-size: 18px;
        width: 60px;
        height: 40px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        background-color: #f8e776;
        border-bottom: none;
      }
    }
  }
`;

export default boardDetailContainer;
