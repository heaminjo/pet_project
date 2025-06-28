import styled from 'styled-components';

// 변수 선언 후 export
const ModalComp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal_container {
    background-color: #fff;
    border-radius: 12px;
    padding: 50px;
    width: 420px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 30px;
    line-height: 1.5;
  }

  .answer_btn {
    display: flex;
    justify-content: center;
    gap: 16px;

    button {
      width: 120px;
      height: 45px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #ffe0e0;
        border-color: #ffaaaa;
      }

      &:first-child {
        background-color: #ff6666;
        color: #fff;
        border: none;

        &:hover {
          background-color: #ff4d4d;
        }
      }
    }
  }
`;
//회원 탈퇴처리
export default ModalComp;
