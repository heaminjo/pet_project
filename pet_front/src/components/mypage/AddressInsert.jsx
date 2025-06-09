import styled from "styled-components";
import AddressModal from "../../modal/AddressModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MemberApi from "../../api/MemberApi";
export default function AddressInsert({ setIsInsert }) {
  const [popup, setPopup] = useState(false); //우편번호 팝업
  //유효성 조건(yup)

  const schema = yup.object({
    addressName: yup.string().required("필수 입력입니다."),
    address1: yup.string().required("필수 입력입니다."),
    addressZip: yup.string().required("필수 입력입니다."),
  });
  const {
    register, //폼 필드와 리액트 훅 폼을 연결
    watch, //특정 watch("email") 입력값들을 실시간 감시
    handleSubmit,
    trigger, //실시간 검사
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // 실시간 검사
  });
  const onClickSubmit = async () => {
    const address = {
      addressName: watch("addressName"),
      addrType: "NORMAL",
      address1: watch("address1"),
      address2: watch("address2"),
      addressZip: watch("addressZip"),
    };
    const result = await MemberApi.addrInsert(address);

    if (result.success) {
      alert("배송지 추가가 완료되었습니다.");
      setIsInsert(false);
    } else {
      alert("실패");
    }
  };
  return (
    <InsertComp>
      <div className="insert_inner">
        {popup && (
          <AddressModal
            watch={watch}
            setValue={setValue}
            setPopup={setPopup}
            rigth="45px"
            bottom="10px"
          ></AddressModal>
        )}
        <form onSubmit={handleSubmit(() => onClickSubmit())}>
          <ul className="input_addr">
            <li>
              <input
                type="text"
                {...register("addressName")}
                name="addressName"
                placeholder="배송지 이름"
              />
              {errors.addressName && (
                <p className="error_message">{errors.addressName.message}</p>
              )}
            </li>
            <li id="post">
              <input
                type="text"
                {...register("addressZip")}
                readOnly
                placeholder="우편번호"
              />
              <button
                className="btn"
                type="button"
                id="post_btn"
                onClick={() => setPopup(true)}
              >
                우편번호 찾기
              </button>
            </li>
            <li>
              <input
                type="text"
                {...register("address1")}
                readOnly
                placeholder="기본주소"
              />
            </li>
            {errors.address1 && (
              <p className="error_message">{errors.address1.message}</p>
            )}
            <li>
              <input
                type="text"
                {...register("address2")}
                name="address2"
                placeholder="상세주소(선택)"
              />
            </li>
          </ul>
          <div className="sub_btn">
            <button type="submit">추가</button>
          </div>
        </form>
      </div>
    </InsertComp>
  );
}
const InsertComp = styled.div`
  .insert_inner {
    width: 100%;
    height: 100%;
    .input_addr {
      display: flex;
      height: 400px;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      li {
        padding: 0 20px;
        input {
          width: 100%;
          height: 40px;
          padding-left: 10px;
        }
      }
      #post {
        display: flex;
        justify-content: space-between;
        input {
          width: 240px;
        }
        button {
          cursor: pointer;
          background-color: #f8e776;
          border: none;
          font-size: 12px;
          padding: 0 10px;
        }
      }
      .error_message {
        color: red;
        font-size: 13px;
        font-weight: bold;
        position: absolute;
        left: 20px;
      }
    }
    .sub_btn {
      display: flex;
      justify-content: center;
      button {
        width: 300px;
        height: 40px;
        border: none;
        box-shadow: 2px 2px 2px #888;
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
`;
