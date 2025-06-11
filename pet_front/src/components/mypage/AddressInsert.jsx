import styled from "styled-components";
import AddressModal from "../../modal/AddressModal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MemberApi from "../../api/MemberApi";
export default function AddressInsert({ setIs, data }) {
  const [popup, setPopup] = useState(false); //우편번호 팝업
  const [type, setType] = useState("");
  //유효성 조건(yup)
  //수정과 추가를 구분하는 컴포넌트

  //수정인지 추가인지 데이터 존재를 통하여 구별
  useEffect(() => {
    if (data != null) {
      //수정하기
      setType("수정");
      //값을 초기화
      reset({
        addressName: data?.addressName,
        address1: data?.address1,
        address2: data?.address2,
        addressZip: data?.addressZip,
      });
    } else {
      //추가하기
      setType("추가");
    }
  }, [setIs]);

  const schema = yup.object({
    addressName: yup.string().required("필수 입력입니다."),
    address1: yup.string().required("필수 입력입니다."),
    addressZip: yup.string().required("필수 입력입니다."),
  });
  const {
    register, //폼 필드와 리액트 훅 폼을 연결
    watch, //특정 watch("email") 입력값들을 실시간 감시
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // 실시간 검사
  });

  //버튼 클릭
  //수정인지 추가인지 구별한다.
  const onClickSubmit = async () => {
    //정보 담기
    let address = {
      addressName: watch("addressName"),
      addrType: "NORMAL",
      address1: watch("address1"),
      address2: watch("address2"),
      addressZip: watch("addressZip"),
    };

    let result;
    if (type == "추가") result = await MemberApi.addrInsert(address);
    else {
      //수정이라면 id를 넣어 API
      address = {
        ...address,
        addressId: data.addressId,
      };
      result = await MemberApi.addrUpdate(address);
    }
    alert(result.message);
    setIs(false);
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
            <button type="submit">{type}</button>
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
