import styled from 'styled-components';
const FavoriteComp = styled.div`
  .favorite-container {
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgb(248, 246, 246);
    border-radius: 3px;
    border: 1px solid #ccc;
    font-family: 'Arial', sans-serif;
    color: #222;

    .top {
      text-align: center;
      margin-bottom: 30px;

      h2 {
        font-size: 1.6rem;
        font-weight: bold;
        color: #222;
        background-color: #d9cfcc;
        padding: 10px;
        border-radius: 6px;
        display: inline-block;
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .prod {
        width: 800px;
        display: flex;
        gap: 20px;
        background-color: #fff;
        border-radius: 6px;
        padding: 20px;
        padding-left: 30px;
        border: 1px solid #ddd;
        transition: box-shadow 0.3s ease;
        cursor: pointer;

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .prod-left {
          flex-shrink: 0;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fdfdfd;
          border: 1px solid #ccc;
          border-radius: 6px;

          img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 6px;
          }
        }

        .prod-right {
          width: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 15px;
          color: #444;

          h4 {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 6px;
            color: #111;
          }

          p {
            margin: 4px 0;
          }

          p:nth-child(3) {
            font-weight: bold;
            color: #e91e63;
          }

          p:nth-child(4) {
            font-size: 0.95rem;
            color: #555;
          }
        }
      }
    }
  }
`;

export default FavoriteComp;
