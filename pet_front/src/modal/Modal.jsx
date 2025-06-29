import ModalComp from "./ModalDefaultStyle";

export default function Modal({ clickEvt, setModal, content }) {
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
