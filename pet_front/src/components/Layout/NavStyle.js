import styled from "styled-components";

const NavComp = styled.nav`
  .max_nav {
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #000;
    background-color: #c1b7b3;
    @media (max-width: 767px) {
      display: none;
    }
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
  }
  .min_nav {
    width: 500px;
    height: 100dvh;
    background-color: #222;
    opacity: 0.8;
    z-index: 10;
    color: #fff;
    position: absolute;
    top: 0;
    right: -20px;
    display: none;
    @media (max-width: 767px) {
      display: block;
    }
    .nav_btn {
      height: 100px;
      line-height: 100px;
      font-size: 50px;
      span {
        margin-left: 30px;
        cursor: pointer;
      }
    }
    ul {
      height: 100%;
      margin: 0 auto;
      text-align: center;
      li {
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        font-weight: bold;
        border-bottom: 1px solid #fff;
        cursor: pointer;
        transition: all 0.3s ease; /* 부드러운 전환 효과 */
      }
      li:hover {
        background-color: #fff;
        color: #444;
      }
    }
  }
`;
export default NavComp;
