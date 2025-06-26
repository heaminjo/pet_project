const { default: styled } = require("styled-components");

const CommentListStyle = styled.div`
  .comment-list {

    li {

      .editRow {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #eee;
        padding-bottom: 2px;
        transition: border-bottom-color 0.2s;
        margin-bottom: 5px;

        input {
          flex: 1;
          height: 30px;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          box-sizing: border-box;
        }

        &:focus-within {
          border-bottom-color: #E5DDD6;
        }

        input:focus {
          outline: none;  
          border-bottom-color: #E5DDD6;
        }

        button {
          width: 50px;
          height: 25px;
          margin-left: 10px;
          background-color: #E5DDD6;
          color: #333;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          padding: 0 10px;
        }

      }

      .meta-row {
        min-height: 25px;
        display: flex;
        justify-content: space-between; /* 오른쪽 정렬 */
        margin-top: 4px;
        align-items: center;
        border-bottom: 1px solid #eee;
        margin-bottom: 15px;
        min-height: 30px;
      }

      .regdate {
        font-size: 16px;
        color: #888;
        margin-left: 5px;
        min-height: 30px;
        line-height: 25px;
      }

      .button-group {
        display: flex;
        margin-bottom: 5px;

        button {
          width: 50px;
          height: 25px;
          line-height: 25px;
          margin-left: 3px;
          background-color: #E5DDD6;
          color: #333;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 15px;
          padding: 0;
        }

      }

      .button-group {
        display: flex;
        margin-bottom: 5px;

        button {
          width: 50px;
          height: 25px;
          line-height: 25px;
          margin-left: 3px;
          background-color: #E5DDD6;
          color: #333;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 15px;
          padding: 0;
        }

      }
      
    }
  }

`;

export default CommentListStyle;