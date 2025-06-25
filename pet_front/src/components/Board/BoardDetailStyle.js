const { default: styled } = require("styled-components");

const boardDetailContainer = styled.div`
  margin-top: 200px;
  height: auto;
  min-height: 1500px;
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
        background-color: #E5DDD6;
        border-bottom: none;
      }
    }
  }
`;

export default boardDetailContainer;
