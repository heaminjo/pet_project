import styled from "styled-components";

export default function Modal({ clickEvt, setModal, content }) {
  const ModalComp = styled.div`
    position: absolute;
    width: 400px;
    height: 250px;
    background-color: #fff;
    background-color: #f7f770;
    border: 2px solid #d7d715;
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

  return (
    <ModalComp>
      <div className="modal_container">
        <h3>{content}</h3>
        <div className="answer_btn">
          <button onClick={() => clickEvt()}>예</button>
          <button onClick={() => setModal(false)}>아니요</button>
        </div>
      </div>
    </ModalComp>
  );
}
