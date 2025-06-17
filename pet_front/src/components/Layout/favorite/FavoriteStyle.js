import styled from 'styled-components';

const FavoriteComp = styled.div`
  .container {
    width: 900px;
    height: 1200px;
    margin: 0 auto;
    padding: 0px;
    border-radius: 10px;
    border: 1px solid rgb(200, 200, 200);
    .body {
      width: 850px;
      height: 800px;
      margin: 10px auto;
      .prod {
        width: 100%;
        height: 200px;
        display: flex;
        border: 1px solid rgb(200, 200, 200);
        margin: 10px auto;

        .prod-right {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;

export default FavoriteComp;
