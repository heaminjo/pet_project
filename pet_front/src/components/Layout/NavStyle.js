import styled from 'styled-components';

const NavComp = styled.nav`
  width: 100%;
  height: 50px;
  // border-bottom: 1px solid rgb(207, 192, 192);
  background-color: rgb(255, 255, 255);

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
        color: rgb(102, 85, 85);
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
        font-size: 1.05em;
        text-shadow: 1px 1px 1px rgb(202, 186, 180);
        color: rgb(146, 129, 129);
      }
    }
  }
`;
export default NavComp;
