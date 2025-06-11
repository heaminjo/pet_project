import styled from 'styled-components';

const GoodsListComp = styled.div`
  .container {
    width: 900px;
    height: 1200px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 150px;

    .body {
      width: inherit;
      height: inherit;
      // border: 1px solid rgb(230, 230, 230);
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
        margin: 50px 0 auto;

        .goodslist {
          width: 250px;
          height: 300px;
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
