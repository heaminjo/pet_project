const { default: styled } = require("styled-components");

const boardInsertFormStyle = styled.div`
  margin-top: 200px;
  min-height: 1500px;
  height: auto;
  
  .boardInsertFormContainer {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 32px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    width: 100%;

    h2 {
      text-align: center;
      margin-bottom: 32px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .titleRow,
    .contentRow {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .titleLabel,
    .contentLabel {
      font-size: 16px;
      color: #444;
      font-weight: bold;
    }

    .titleInput {
      font-size: 20px;
      padding: 10px 12px;
      border: none;
      border-bottom: 2px solid #eee;
      outline: none;
      background: #fafafa;
      border-radius: 0;
      transition: border-color 0.2s;
      &:focus {
        border-bottom: 2px solid #E5DDD6;
      }
    }

    .categoryLabel {
      font-size: 16px;
      color: #444;
      font-weight: bold;
    }

    .categorySelect {
      width: 100%;
      font-size: 18px;
      padding: 10px 12px;
      border: none;
      border-bottom: 2px solid #eee;
      border-radius: 4px;
      background: #fafafa;
      outline: none;
      transition: border-color 0.2s;
      &:focus {
        border-color: #E5DDD6;
      }
    }

    .contentTextarea {
      min-height: 180px;
      font-size: 16px;
      padding: 12px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #fafafa;
      resize: vertical;
      transition: border-color 0.2s;
      &:focus {
        border-color: #E5DDD6;
        outline: none;
      }
    }

    .fileRow {
      display: flex;
      justify-content: flex-end;

      .uploadBox {
        display: flex;
        align-items: center;
        border: 2px solid #eee;
        border-radius: 10px;
        background: #fafafa;
        padding: 10px 16px;
        min-height: 10px;
        gap: 10px;

        .imageLabel {
          display: inline-block;
          background: #fafafa;
          font-size: 16px;
          font-weight: bold;
          border-radius: 10px 10px 10px 10px;
          padding: 12px 24px;
          cursor: pointer;
          border: none;
          outline: none;
          transition: background 0.2s;
          vertical-align: middle;
        }

        .fileNameText {
          display: inline-block;
          font-size: 15px;
          margin-left: 10px;
          vertical-align: middle;
        }
      }

      .imagePreview {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        max-width: 100%;
        overflow-x: auto;

        .imagePreviewBox {
          position: relative;
          width: 100px;
          height: 100px;
          aspect-ratio: 1 / 1; /* 정사각형 유지 */
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          background: #fafafa;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          button {
            position: absolute;
            top: 6px;
            right: 6px;
            background: rgba(0,0,0,0.55);
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
            transition: background 0.2s, opacity 0.2s;
          }

          button:hover {
            background: #f44336;
            opacity: 1;
          }

        }

      }
    }

    .submitBtn {
      width: 100%;
      padding: 10px 28px;
      font-size: 18px;
      background: #E5DDD6;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: "GmarketSansMedium";
      transition: background 0.2s;
      &:hover {
        background: #ffe066;
      }
    }
  }
`;
export default boardInsertFormStyle;
