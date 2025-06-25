import styled from "styled-components";

const NavComp = styled.nav`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #000;
  background-color: #c1b7b3;

  .nav_inner {
    width: 1200px;
    margin: 0 auto;
    .nav_menu {
      margin: 0;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      li {
        width: 100%;

        font-weight: bold;
        color: #444;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s ease; /* 부드러운 전환 효과 */
        svg {
          font-size: 20px;
        }
      }
      li:hover {
        font-size: 1.2em;
        text-shadow: 1px 1px 1px #a1887f;
        color: #fff;
      }
    }
  }
`;
export default NavComp;
