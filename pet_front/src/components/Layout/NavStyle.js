import styled from 'styled-components';

const NavComp = styled.nav`
  width: 100%;
  height: 50px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(150, 140, 140);
  z-index: 100;

  .nav_inner {
    width: 1200px;
    margin: 0 auto;

    .nav_menu {
      margin: 0;
      padding: 0;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      position: relative;

      li {
        position: relative;
        padding: 0 20px;
        font-weight: bold;
        color: rgb(102, 85, 85);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        svg {
          font-size: 20px;
        }

        &:hover {
          font-size: 1.05em;
          text-shadow: 1px 1px 1px rgb(202, 186, 180);
          color: rgb(146, 129, 129);
        }

        /* 드롭다운 콘텐츠 */
        &.dropdown:hover .dropdown_content {
          display: flex;
          opacity: 0.9;
          visibility: visible;
        }

        .dropdown_content {
          display: flex;
          gap: 10px;
          justify-content: space-between;
          position: absolute;
          top: 100%;
          left: -30px;
          background-color: rgba(255, 255, 255, 0.95);
          border: 1px solid #ccc;
          padding: 20px 30px;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: 1000;
          min-width: 400px; /* 드롭다운 폭 줄임 */
        }

        .submenu {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;

          .title {
            width: 150px;
            font-weight: bold;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #aaa;
            font-size: 18px;
          }

          ul {
            display: flex;
            flex-direction: column; /* 명시적으로 세로 정렬 */
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              cursor: pointer;
              white-space: nowrap;
              font-size: 14px;
              line-height: 24px; /* 고정된 높이, hover 시 레이아웃 흔들림 방지 */

              &:hover {
                font-size: 15px;
                transition: all 0.1s ease;
                color: #555;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
`;

export default NavComp;
