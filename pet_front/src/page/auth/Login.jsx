import LoginComp from "./LoginStyle";

export default function Login() {
  return (
    <LoginComp>
      <input type="email" id="email" name="email" placeholder="이메일 입력" />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="비밀번호 입력"
      />
    </LoginComp>
  );
}
