import { useForm } from "react-hook-form";
import LoginComp from "./LoginStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MemberApi from "../../api/MemberApi";
import { useNavigate } from "react-router-dom";
export default function Login() {
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
    if (result) {
      alert("로그인 성공!");

      //로그인 성공 시 localStorage에 id와 name이 담깁니다.
      localStorage.setItem("loginId", result.data.id);
      localStorage.setItem("loginName", result.data.name);
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
