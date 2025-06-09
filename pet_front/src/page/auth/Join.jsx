import { act, useReducer, useRef, useState } from "react";
import JoinComp from "./JoinStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MemberApi from "../../api/MemberApi";
import AddressModal from "../../modal/AddressModal";
import { useLocation } from "react-router-dom";
export default function Join() {
  const [isEmailCheck, setIsEmailCheck] = useState(false); //이메일 중복 체크
  const emailRef = useRef(null);
  const btnRef = useRef(null);
  const [popup, setPopup] = useState(false); //우편번호 팝업
  const location = useLocation(); // 회원의 상태 확인

  //유효성 조건(yup)
  const schema = yup.object({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다.")
      .required("필수 입력입니다."),
    password: yup
      .string()
      .required("필수 입력입니다.")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-=|\\]).{10,16}$/,
        "10~16자 대소문자+영문+특수 기호로 조합해주세요."
      ),

    password2: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인은 필수 입니다."),

    name: yup
      .string()
      .required("필수 입력입니다")
      .matches(/^[가-힣]*$/, "한글로만 입력해주세요.")
      .max(4, "4자 이내로 입력해주세요."),
    birth: yup
      .string()
      .matches(
        /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
        "정확한 생년월일 8자리로 입력해주세요"
      ),
    gender: yup.string().oneOf(["MALE", "FEMALE"]),
    phone: yup
      .string()
      .matches(/^[0-9\b]{0,13}$/, "휴대번호를 정확하게 입력해주세요."),
    address1: yup.string().required("필수 입력입니다."),
  });

  //react hook form
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
    defaultValues: {
      gender: "MALE",
    },
  });

  //중복버튼 이메일 유효성 검사사
  const clickDupEmail = async () => {
    if (await trigger("email")) {
      DupEmailCheck(watch("email"));
    } else {
      alert("이메일을 다시 확인해주세요.");
      emailRef.current.focus(); //포커싱
    }
  };

  //이메일 중복 체크
  const DupEmailCheck = async (email) => {
    const result = await MemberApi.dupEmail(email);

    console.log("중복인가?" + result);
    //중복이면 true 아니면 false
    if (!result) {
      alert("사용가능한 이메일 입니다.");
      setIsEmailCheck(true);
    } else {
      alert("중복된 이메일입니다.");
    }
  };

  //회원 가입 클릭 시 유효성 검사 및 이메일 체크
  //통과 시 회원가입 진행
  const onClickSubmit = () => {
    if (!isEmailCheck) {
      alert("중복 검사는 필수 입니다.");
      btnRef.current.focus();
    } else {
      saveMember();
    }
  };

  //회원가입
  const saveMember = async () => {
    const newUser = {
      email: watch("email"),
      password: watch("password"),
      name: watch("name"),
      birth: watch("birth"),
      phone: watch("phone"),
      gender: watch("gender"),
      address1: watch("address1"),
      address2: watch("address2"),
      addressZip: watch("addressZip"),
    };

    const result = await MemberApi.join(newUser);
    console.log(result.success);
    if (result.success) {
      alert("회원가입 성공");
    } else {
      alert("회원가입 실패");
    }
    console.log("회원가입 유저 정보 확인" + newUser.email);
  };
  return (
    <JoinComp>
      <div className="join_inner">
        <div className="join_container">
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit(() => onClickSubmit())}>
            <table>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="email">이메일</label>
                  </th>
                  <td id="td_email">
                    <input
                      type="email"
                      {...register("email")} //상태값 저장
                      id="email"
                      name="email"
                      ref={(e) => {
                        register("email").ref(e);
                        emailRef.current = e;
                      }}
                      disabled={isEmailCheck}
                    />
                    {/* yup으로 인해 자동으로 submit으로 변경되니 type button을 명시적으로 표시 */}
                    <button
                      ref={btnRef}
                      id="email_btn"
                      type="button"
                      onClick={() => clickDupEmail()}
                      disabled={isEmailCheck}
                    >
                      중복 체크
                    </button>
                    {errors.email && (
                      <p className="error_message">{errors.email.message}</p>
                    )}
                  </td>
                </tr>
                {location.kakaoMember && (
                  <>
                    <tr>
                      <th>
                        <label htmlFor="email">비밀번호</label>
                      </th>
                      <td>
                        <input
                          type="password"
                          {...register("password")}
                          id="password"
                          name="password"
                        />
                        {errors.password && (
                          <p className="error_message">
                            {errors.password.message}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="password2">비밀번호 확인</label>
                      </th>
                      <td>
                        <input
                          type="password"
                          {...register("password2")}
                          id="password2"
                          name="password2"
                        />
                        {errors.password2 && (
                          <p className="error_message">
                            {errors.password2.message}
                          </p>
                        )}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th>
                    <label htmlFor="email">이름</label>
                  </th>
                  <td>
                    <input
                      type="name"
                      {...register("name")}
                      id="name"
                      name="name"
                    />
                    {errors.name && (
                      <p className="error_message">{errors.name.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="text">생년월일</label>
                  </th>
                  <td>
                    <input
                      type="text"
                      {...register("birth")}
                      id="birth"
                      name="birth"
                      placeholder="ex) 20001010"
                    />
                    {errors.birth && (
                      <p className="error_message">{errors.birth.message}</p>
                    )}
                  </td>
                </tr>
                <tr id="gender">
                  <th>
                    <label htmlFor="text">성별</label>
                  </th>
                  <td
                    style={{
                      background: watch("gender") == "MALE" ? "#ccc" : "#fff",
                    }}
                  >
                    <label htmlFor="MALE">
                      <input
                        type="radio"
                        value="MALE"
                        {...register("gender")}
                        name="gender"
                        id="MALE"
                      />
                      남성
                    </label>
                  </td>
                  <td
                    style={{
                      background: watch("gender") == "FEMALE" ? "#ccc" : "#fff",
                    }}
                  >
                    <label htmlFor="FEMALE">
                      <input
                        type="radio"
                        value="FEMALE"
                        id="FEMALE"
                        {...register("gender")}
                        name="gender"
                      />
                      여성
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="text">휴대번호</label>
                  </th>
                  <td>
                    <input
                      type="tel"
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      placeholder="(-) 빼고 입력"
                    />
                    {errors.phone && (
                      <p className="error_message">{errors.phone.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="email">주소</label>
                  </th>
                  <td>
                    <ul>
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
                      <li>
                        <input
                          type="text"
                          {...register("address2")}
                          name="address2"
                          placeholder="상세주소(선택)"
                        />
                      </li>
                      <li>
                        {errors.address1 && (
                          <p className="error_message">
                            {errors.address1.message}
                          </p>
                        )}
                      </li>
                      {/* 주소 Api */}
                      {popup && (
                        <AddressModal
                          watch={watch}
                          setValue={setValue}
                          setPopup={setPopup}
                        ></AddressModal>
                      )}
                    </ul>
                  </td>
                </tr>
                <tr id="tr_btn">
                  <td>
                    <button className="btn" id="sub_btn" type="submit">
                      회원가입
                    </button>
                  </td>
                  <td>
                    <button className="btn" id="reset_btn" type="reset">
                      취소
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </JoinComp>
  );
}
