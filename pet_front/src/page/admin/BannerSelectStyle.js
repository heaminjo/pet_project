import styled from "styled-components";

const BannerSelectComp = styled.div`
  width: 950px;
  .select_container {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .modal {
      position: fixed;
      left: 600px;
      text-align: center;
      top: 245px;
    }
    .banner_list {
      width: 100%;
      height: 350px;
      border: 1px solid #ccc;
      padding: 10px;
      box-shadow: 3px 3px 3px #ccc;
      h3 {
        text-align: center;
        margin-bottom: 20px;
      }
      ul {
        display: flex;
        width: 100%;
        gap: 10px;
        li {
          width: 180px;
          height: 180px;
          border: 1px solid #aaa;
          box-shadow: 3px 3px 3px #aaa;
          border-radius: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          p {
            text-align: center;
            /* line-height: 200px; */
          }
          .banner_text {
            margin-top: 10px;
          }
          .banner_mod {
            display: flex;
            gap: 1px;
            button {
              margin-top: 17px;
              width: 100px;
              height: 41px;
            }
            button:nth-child(1) {
              background-color: #ffffd0;
              border: 2px solid #dcdc98;
            }
            button:nth-child(2) {
              background-color: #eaeaea;
              border: 2px solid #b0b0b0;
            }
          }
          .banner_sel {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        button {
          font-weight: bold;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #bbb;
        }
      }
    }
    .goods_select {
      width: 930px;
      height: 500px;
      box-shadow: 3px 3px 3px #ccc;
      border: 1px solid #ccc;
      padding: 20px;
      .category_list {
        display: flex;
        justify-content: center;
        gap: 10px;
        li {
          width: 100px;
          height: 40px;
          background-color: rgb(54, 54, 54);
          color: #fff;
          text-align: center;
          border-radius: 20px;
          line-height: 40px;
          cursor: pointer;
        }
      }
    }
  }
`;
export default BannerSelectComp;
