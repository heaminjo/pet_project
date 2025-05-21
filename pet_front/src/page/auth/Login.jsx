import LoginComp from "./LoginStyle";

export default function Login() {
  return (
    <LoginComp>
      <div className="login_inner">
        <div className="login_container">
          <h2>로그인</h2>
          <form>
            <table>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="email">이메일</label>
                  </th>
                  <td id="td_email">
                    <input type="email" id="email" name="email" />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="email">비밀번호</label>
                  </th>
                  <td>
                    <input type="password" id="password" name="password" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </LoginComp>
  );
}
