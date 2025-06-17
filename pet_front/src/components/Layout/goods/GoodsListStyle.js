import styled from 'styled-components';

const GoodsListComp = styled.div`
  .container {
    width: 900px;
    height: 2000px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 150px;

    .search-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px 0 0 0;

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
        width: 500px; /* input은 더 넓게 */
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
      height: inherit;
      // border: 1px solid rgb(230, 230, 230);
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h2 {
        margin-top: 30px;
      }

      .list {
        width: 850px;
        flex-wrap: wrap; /* 줄바꿈 허용 */
        display: flex;
        flex-direction: row;
        margin: 30px 0 auto;
        justify-content: flex-start; /* ← 가운데가 아닌 왼쪽 정렬 */
        gap: 10px; /* 아이템 간 간격 */

        .goodslist {
          width: 250px;
          height: 350px;
          margin: 2px auto;
          flex: 0 0 calc(25% - 10px); /* 한 줄에 5개 (100% / 5) */
          border: 1px solid rgb(185, 185, 185);
          div {
            margin-left: 10px;
          }
          .prodimg {
            width: 150px;
            height: 150px;
            margin: 10px;
            align-items: center;
            padding: 10px;
            box-shadow: 1px 1px 3px rgb(150, 150, 150);
          }
        }
      }
      .list1 {
        height: 300px;
        border: 1px solid rgb(230, 230, 230);
        display: flex;
        flex-direction: row;
        background-color: aqua; /* TEST 용 */
      }
      .list2 {
        height: 300px;
        border: 1px solid rgb(230, 230, 230);
      }
    }
  }
`;
export default GoodsListComp;
