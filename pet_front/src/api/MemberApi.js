const { default: axios } = require("axios");

const KH_DOMAIN = "http://localhost:8086";
const MemberApi = {
  //로그인
  login: async (email, password) => {
    const login = {
      email: email,
      password: password,
    };
    return await axios.post(`${KH_DOMAIN}/auth/login`, login);
  },
};
