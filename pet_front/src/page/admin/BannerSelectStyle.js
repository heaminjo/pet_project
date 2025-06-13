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
              width: 200px;
              height: 41px;
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
      width: 900px;
      height: 650px;
      box-shadow: 3px 3px 3px #ccc;
      border: 1px solid #888;
      padding: 20px;
      /* display: flex; */
      /* gap: 10px; */
      h3 {
        text-align: center;
        margin-bottom: 10px;
      }
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
      .search {
        width: 100%;
        display: flex;
        height: 70px;
        justify-content: center;
        align-items: center;
        input {
          height: 40px;
          width: 300px;
          border: none;
          border-bottom: 2px solid #000;
          outline: none;
          padding-left: 10px;
        }
        button {
          height: 42px;
          width: 41px;
          border: none;
          padding: 10px;
          right: 0;
          border-bottom: 2px solid #000;
          background-color: #fff;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .goods_list {
        width: 100%;
        height: 400px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;
        .goods_item {
          border: 1px solid #ccc;
          box-shadow: 1px 1px 1px #888;
          padding: 20px;
          display: flex;
          img {
            width: 180px;
            height: 160px;
          }
          ul {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 5px 20px;
            li {
              button {
                margin-top: 10px;
                width: 100px;
                height: 40px;
                border: 1px solid #555;
                box-shadow: 2px 2px 2px #777;
                cursor: pointer;
                font-weight: bold;
              }
              button:hover {
                background-color: #ddd;
              }
            }
          }
        }
      }
    }
  }
`;
export default BannerSelectComp;
