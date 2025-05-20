import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

//주소 api
const AddressComp = styled.div`
  position: absolute;
  border: 2px solid #ccc;
  right: -350px;
  bottom: 13px;
  background-color: #f8e776;
  .modal_top {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    p {
      color: #fff;
      font-weight: bold;
    }
    button {
      border: none;
      border-radius: 100%;
      background-color: #fff;
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }
`;
export default function AddressApi({ watch, setValue, setPopup }) {
  const completeHandler = (data) => {
    // {} 이 끝난 후 = 는 문법상 에러
    //구조 분해 하기 위해 괄호로 감싼다.
    const { address, zonecode } = data;

    //setValue로 훅 폼에 항목 값을 업데이트함과 동시에 유효성 체크(shouldValidate: true )
    setValue("addressZip", zonecode);
    setValue("address1", address, { shouldValidate: true });
    setPopup(false);
  };
  return (
    <AddressComp>
      <div className="modal_top">
        <p>우편번호 검색</p>
        <button onClick={() => setPopup(false)}>✖️</button>
      </div>
      <DaumPostcode className="address_box" onComplete={completeHandler} />
    </AddressComp>
  );
}
