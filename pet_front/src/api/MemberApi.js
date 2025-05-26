import axios from "axios";

const KH_DOMAIN = "http://localhost:8080";
const MemberApi = {
  //로그인
  login: async (email, password) => {
    const login = {
      email: email,
      password: password,
    };
    const result = await axios.post(`${KH_DOMAIN}/auth/login`, login);
    return result.data;
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
    return result.data.body;
  },

  //회원 조회
  detail: async () => {
    const result = await axios.get(`${KH_DOMAIN}/member/detail`, {
      headers: {
        Authorization: `${localStorage.getItem(
          "grantType"
        )} ${localStorage.getItem("accessToken")}`,
      },
    });
    return result.data;
  },

  //회원 수정정
  update: async (user) => {
    const result = await axios.patch(`${KH_DOMAIN}/member/update`, user, {
      headers: {
        Authorization: `${localStorage.getItem(
          "grantType"
        )} ${localStorage.getItem("accessToken")}`,
      },
    });
    return result.data;
  },
};
export default MemberApi;
