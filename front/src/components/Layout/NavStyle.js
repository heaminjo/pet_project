import styled from "styled-components";

const NavComp = styled.nav`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #000;
  background-color: #aaa;
  .nav_inner {
    width: 1200px;
    margin: 0 auto;
    .nav_menu {
      margin: 0;
      line-height: 70px;
      display: flex;
      justify-content: space-between;
      li {
        width: 100%;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
      }
      li:hover {
        font-size: 1.2em;
        color: #fff;
        background-color: #ff6666;
      }
    }
  }
`;
export default NavComp;
