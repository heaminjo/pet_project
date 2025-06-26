import styled from 'styled-components';

// 변수 선언 후 export
const ModalComp = styled.div`
  position: absolute;
  width: 400px;
  height: 250px;
  background-color: #fff;
  background-color: #7a8f99;
  border: 2px solid #585351;
  text-align: center;
  h3 {
    margin: 60px 0;
  }
  .answer_btn {
    display: flex;

    justify-content: center;
    gap: 10px;
    button {
      width: 100px;
      height: 50px;
      cursor: pointer;
      background-color: #fff;
      border: none;
    }
    button:hover {
      background-color: #eee;
    }
  }
`;
//회원 탈퇴처리
export default ModalComp;
