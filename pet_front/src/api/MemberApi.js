import axios from "axios";

const KH_DOMAIN = "http://localhost:8080";
const MemberApi = {
  //로그인
  login: async (email, password) => {
    const login = {
      email: email,
      password: password,
    };
    return await axios.post(`${KH_DOMAIN}/auth/login`, login);
  },
  //이메일 중복 체크
  dupEmail: async (email) => {
    const result = await axios.get(
      `${KH_DOMAIN}/member/emailcheck?email=${email}`
    );
    return result.data;
  },

  //회원가입
  join: async (newUser) => {
    const result = await axios.post(`${KH_DOMAIN}/auth/join`, newUser);
    return result.data;
  },
};
export default MemberApi;
