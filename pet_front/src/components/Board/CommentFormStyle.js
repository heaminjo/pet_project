const { default: styled } = require("styled-components");

const CommentFormStyle = styled.div`
  .comment-form-container {
    width: 100%;

    .comment-form {
      display: flex;
      flex-direction: column;
      
      input {
        width: 100%;
        height: 30px;
        padding: 10px;
        font-size: 16px;
        border: none;
        border-bottom: 2px solid #eee;
        border-radius: 5px;
        box-sizing: border-box;
      }

      .button-row {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }

      button {
        width: 5%;
        height: 30px;
        margin-left: 10px;
        background-color: #f8e776;
        color: #333;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }
    }  
  }  
`;

export default CommentFormStyle;