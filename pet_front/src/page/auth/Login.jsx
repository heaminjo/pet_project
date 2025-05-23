import { useForm } from "react-hook-form";
import LoginComp from "./LoginStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MemberApi from "../../api/MemberApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PetContext } from "../../App";
export default function Login() {
  const { setIsLogin } = useContext(PetContext);
  const navigate = useNavigate();

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
  });

  //폼 상태관리
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

  //로그인 버튼 클릭
  const clickLogin = async () => {
    const result = await MemberApi.login(watch("email"), watch("password"));
    if (result.success) {
      alert("로그인 성공!");
      localStorage.setItem("loginName", result.data.memberName);
      localStorage.setItem("grantType", result.data.grantType);
      localStorage.setItem("accessToken", result.data.accessToken);

      //전역변수에 로그인 여부 저장
      setIsLogin(true);
      navigate("/");
    } else {
      alert("로그인 실패");
    }
  };
  return (
    <LoginComp>
      <div className="login_inner">
        <div className="login_container">
          <h2>로그인</h2>
          <form onSubmit={handleSubmit(() => clickLogin())}>
            <ul className="login_form">
              <li>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error_message">{errors.email.message}</p>
                )}
              </li>
              <li>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error_message">{errors.password.message}</p>
                )}
              </li>
            </ul>
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </LoginComp>
  );
}
