import { act, useReducer, useState } from "react";
import JoinComp from "./JoinStyle";
import AddressApi from "../../api/AddressApi";

export default function Join() {
  //유저 input 정보를 객체로 관리
  //[]로 초기화 할 시 user undifined 에러 발생 하므로 {}
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    birth: "",
    address1: "",
    address2: "",
    addressZip: "",
  });

  const [password2, setPassword2] = useState("");
  const [popup, setPopup] = useState(false); //우편번호 팝업
  const [message, setMessage] = useState("");

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    password2Error: "",
    nameError: "",
    birthError: "",
    addressError: "",
    addressZip: "",
  });
  //input 값 업데이트
  //name 속성을 통해 수정할 input에만 값을 반영한다.
  const changeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //회원 가입 클릭 시 유효성 검사
  const onClickSubmit = () => {};

  //각 항목의 유효성 검사 함수들
  //재사용성을 위해 각각 생성

  //이메일 유효성
  const emailCheck = (e) => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{3,4}$/i;
    !emailRegex.test(e.target.value)
      ? setError({ emailError: "이메일 형식을 사용해주세요" })
      : setError({ emailError: "" });
  };

  //패스워드 유효성
  const pwCheck = (e) => {
    const pw = e.target.value;
    if (pw < 1) {
      setError({ passwordError: "필수 입력입니다." });
    } else {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-=|\\]).{10,16}$/;

      !passwordRegex.test(pw)
        ? setError({
            passwordError: "10~16자 대소문자+영문+특수 기호로 조합해주세요.",
          })
        : setError({ passwordError: "" });
    }
  };

  //패스워드 확인 유효성
  const pw2Check = (e) => {
    const pw2 = e.target.value;
    if (pw2 < 1) {
      setError({ password2Error: "필수 입력입니다." });
    } else {
      user?.password != pw2
        ? setError({
            password2Error: "비밀번호와 일치하지 않습니다.",
          })
        : setError({
            password2Error: "",
          });
    }
  };

  //이름 유효성 확인
  const nameCheck = () => {
    if (user?.name.length < 1) {
      setError({ nameError: "필수 입력 입니다." });
    } else {
      const nameRegex = /^[가-힣]*.{1,4}$/;
      !nameRegex.test(user?.name)
        ? setError({
            nameError: "이름은 in",
          })
        : setError({
            password2Error: "",
          });
    }
  };
  return (
    <JoinComp>
      <div className="join_inner">
        <div className="join_container">
          <h2>회원가입</h2>
          <table>
            <tbody>
              <tr>
                <th>
                  <label htmlFor="email">이메일</label>
                </th>
                <td>
                  <input
                    type="email"
                    value={user?.email}
                    onChange={(e) => changeUser(e)}
                    onBlur={(e) => emailCheck(e)}
                    id="email"
                    name="email"
                  />
                  <p className="error_message">{error?.emailError}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="email">비밀번호</label>
                </th>
                <td>
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) => changeUser(e)}
                    onBlur={(e) => pwCheck(e)}
                    id="password"
                    name="password"
                  />
                  <p className="error_message">{error?.passwordError}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="password2">비밀번호 확인</label>
                </th>
                <td>
                  <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    onBlur={(e) => pw2Check(e)}
                    id="password2"
                    name="password2"
                  />
                  <p className="error_message">{error?.password2Error}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="email">이름</label>
                </th>
                <td>
                  <input
                    type="name"
                    value={user?.name}
                    onChange={(e) => changeUser(e)}
                    id="name"
                    name="name"
                  />
                  <p className="error_message">
                    4자 이내 한글로만 입력해주세요.
                  </p>
                  <p className="error_message">필수 입력입니다.</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="text">생년월일</label>
                </th>
                <td>
                  <input
                    type="text"
                    value={user?.birth}
                    onChange={(e) => changeUser(e)}
                    id="birth"
                    name="birth"
                    placeholder="ex) 20001010"
                  />
                  <p className="error_message">8자로 입력해주세요.</p>
                  <p className="error_message">필수 입력입니다.</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="email">주소</label>
                </th>
                <td>
                  <ul>
                    <li>
                      <input
                        type="text"
                        value={user?.addressZip}
                        readOnly
                        placeholder="우편번호"
                      />
                      <button onClick={() => setPopup(true)}>
                        우편번호 찾기
                      </button>
                    </li>
                    <li>
                      <input
                        type="text"
                        value={user?.address1}
                        readOnly
                        placeholder="기본주소"
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        value={user.address2}
                        name="address2"
                        onChange={(e) => changeUser(e)}
                        placeholder="상세주소"
                      />
                    </li>
                    {/* 주소 Api */}
                    {popup && (
                      <AddressApi user={user} setUser={setUser}></AddressApi>
                    )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <button id="sub_btn" onClick={() => onClickSubmit()}>
            회원가입
          </button>
        </div>
      </div>
    </JoinComp>
  );
}
