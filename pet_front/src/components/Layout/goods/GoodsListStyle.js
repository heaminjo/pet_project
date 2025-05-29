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
      border: 1px solid rgb(230, 230, 230);
      display: flex;
      flex-direction: column;
      justify-content: center;

      .list {
        flex-wrap: wrap; /* 줄바꿈 허용 */
        display: flex;
        flex-direction: row;
        margin: 20px;

        .goodslist {
          width: 220px;
          height: 200px;
          margin: 10px;
          flex: 0 0 calc(20% - 20px); /* 한 줄에 5개 (100% / 5) */
          border: 1px solid rgb(230, 230, 230);
          .prodimg {
            width: 100px;
            height: 100px;
            margin: 10px;
            align-items: center;
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
