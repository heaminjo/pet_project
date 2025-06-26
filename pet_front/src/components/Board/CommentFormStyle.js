const { default: styled } = require("styled-components");

const CommentFormStyle = styled.div`
  .comment-form-container {
    width: 100%;
    margin-bottom: 50px;

    .comment-form {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 2px solid #eee;
      padding-bottom: 2px;

      &:focus-within {
        border-bottom-color: #E5DDD6;
      }
      
      input {
        flex: 1;
        height: 30px;
        padding: 10px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
      }
      
      input:focus {
        outline: none;
      }

      

      button {
        width: 5%;
        height: 30px;
        margin-left: 10px;
        background-color: #E5DDD6;
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