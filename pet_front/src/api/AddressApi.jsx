import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

//주소 api
const AddressComp = styled.div``;
export default function AddressApi({ user, setUser }) {
  const completeHandler = (data) => {
    // {} 이 끝난 후 = 는 문법상 에러
    //구조 분해 하기 위해 괄호로 감싼다.
    const { address, zonecode } = data;

    //user의 기존 입력값을 유지하며 업데이트(props로 user와 setUser를 받아온다.)
    setUser({ ...user, address1: address, addressZip: zonecode });
  };
  return (
    <AddressComp>
      <DaumPostcode onComplete={completeHandler} />
    </AddressComp>
  );
}
