import styled from "styled-components";

const HeaderComp = styled.header`
  width: 100%;
  height: 100px;
  position: fixed;
  z-index: 10000;
  top: 0;
  background-color: rgb(245, 242, 219);
  .header_inner {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    h1 {
      margin: 0;
      line-height: 100px;
      cursor: pointer;
    }
    .member_menu {
      display: flex;
      font-size: 13px;
      font-weight: bold;
      gap: 10px;
      li {
        span {
          cursor: pointer;
          line-height: 150px;
        }
      }
    }
  }
`;
export default HeaderComp;
