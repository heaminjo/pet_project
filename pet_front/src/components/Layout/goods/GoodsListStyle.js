import styled from 'styled-components';

const GoodsListComp = styled.div`
  .container {
    width: 900px;
    height: 900px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 180px;

    .search-bar {
      display: flex;
      width: 780px;
      align-items: center;
      justify-content: center;
      margin: 0 auto;

      select,
      input[type='text'] {
        height: 40px;
        width: 120px; /* 원하는 너비로 맞추세요 */
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 10px;
        border: 1px solid #ccc;
        outline: none;
        background: #fff;
        margin: 0;
        /* 브라우저 기본 스타일 제거 */
        appearance: menulist;
        -webkit-appearance: menulist;
        -moz-appearance: menulist;
      }

      select {
        border-right: none;
        border-radius: 4px 0 0 4px;
        text-align: center;
      }

      input[type='text'] {
        border-left: none;
        border-right: none;
        border-radius: 0;
        width: 400px; /* input은 더 넓게 */
      }

      button {
        height: 40px;
        width: 40px;
        border: 1px solid #ccc;
        border-left: none;
        border-radius: 0 4px 4px 0;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        color: #222;
        transition: background 0.2s;
        &:hover {
          background: #f8e776;
        }
      }
    }

    .body {
      width: inherit;
      // border: 1px solid rgb(230, 230, 230);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start; /* 왼쪽 정렬 */
        gap: 5px; /* 카드 간 여백 */
        flex-direction: row;
        margin: 30px 0 auto;
        justify-content: flex-start; /* ← 가운데가 아닌 왼쪽 정렬 */
        gap: 5px; /* 아이템 간 간격 */

        .goodslist {
          cursor: pointer;
          width: 250px;
          height: 330px;
          margin: 5px;
          padding: 5px;
          align-items: center;
          flex: 0 0 calc(23% - 10px); /* 한 줄에 5개 (100% / 5) */
          border: 1px solid rgb(185, 185, 185);
          text-align: center;
          .description {
            height: 80px;
          }
          .img-container {
            height: 180px;
            display: flex;
            justify-content: center;
            align-items: center;

            .prodimg {
              width: 160px;
              height: 160px;
              margin: 10px;
              object-fit: cover;
              align-items: center;
              margin-botton: 10px;
              padding: 5px;
              transition: transform 0.3s ease; /* 부드러운 애니메이션 */
              box-shadow: 1px 1px 3px rgb(150, 150, 150);
            }
            .prodimg:hover {
              transform: scale(1.05);
            }
          }

          div {
            width: 100%;
            text-align: center;
            margin: 4px 0;
            word-break: break-word;
          }

          // ⭐ 리뷰 개수
          .review-count {
            color: red;
            font-size: 16px;
          }
        }
      }
    }
  }
`;
export default GoodsListComp;
