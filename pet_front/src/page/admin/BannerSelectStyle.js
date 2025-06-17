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
            .banner_input {
              display: block;
              width: 100%;
              background-color: #ccc;
              border-radius: 10px;
              height: 100%;
              background-color: #ddd;
              line-height: 180px;
              text-align: center;
              cursor: pointer;
            }
            .banner_input:hover {
              background-color: #ccc;
            }
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
  }
`;
export default BannerSelectComp;
