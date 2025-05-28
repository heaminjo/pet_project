import styled from 'styled-components';

const GoodsListComp = styled.div`
  .container {
    width: 900px;
    height: 1200px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 150px;
    .body {
      border: 1px solid rgb(230, 230, 230);
      display: flex;
      flex-direction: column;
      .list1 {
        width: 800px;
        height: 300px;
        border: 1px solid rgb(230, 230, 230);

        display: flex;
        flex-direction: row;
        .goodslist {
          width: 200px;
          margin: 10px;
          border: 1px solid rgb(230, 230, 230);
          .prodimg {
            width: 180px;
            height: 200px;
            margin: 10px;
            align-items: center;
          }
        }
      }
      .list2 {
        width: 800px;
        height: 300px;
        border: 1px solid rgb(230, 230, 230);
      }
    }
  }
`;
export default GoodsListComp;
