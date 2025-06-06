import axios from "axios";
import instance from "./axiosInstance";
const KH_DOMAIN = "http://localhost:8080";
const MemberApi = {
  //로그인
  login: async (email, password) => {
    const login = {
      email: email,
      password: password,
    };
    const result = await axios.post(`${KH_DOMAIN}/auth/login`, login, {
      withCredentials: true,
    });
    return result.data;
  },
  //이메일 중복 체크
  dupEmail: async (email) => {
    const result = await axios.get(
      `${KH_DOMAIN}/auth/emailcheck?email=${email}`
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
    //요청 인터셉터를 통해 header
    const result = await instance.get(`${KH_DOMAIN}/user/detail`);
    return result.data;
  },

  //회원 수정정
  update: async (user) => {
    const result = await instance.patch(`${KH_DOMAIN}/user/update`, user);
    return result.data;
  },

  //비밀번호 변경
  updatePw: async (passwords) => {
    const result = await instance.patch(
      `${KH_DOMAIN}/user/pwupdate`,
      passwords
    );
    return result.data;
  },

  //리프레쉬 가져오기기
  getRefresh: async () => {
    const result = await axios.get(`${KH_DOMAIN}/auth/getrefresh`, {
      withCredentials: true,
    });
    return result.data;
  },
  //로그아웃
  logout: async () => {
    const result = await instance.get(`${KH_DOMAIN}/auth/logout`);
    return result.data;
  },
  //회원 탈퇴
  withdrawal: async () => {
    console.log("처리 실행");
    const result = await instance.get(`${KH_DOMAIN}/user/withdrawal`);
    return result.data;
  },

  //업로드 이미지
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await instance.post(
      `${KH_DOMAIN}/user/uploadimage`,
      formData
    );
    return result.data;
  },

  //마지막 로그인 시간 업데이트
  lastLogin: async () => {
    const result = await instance.put(`${KH_DOMAIN}/auth/login/history`);
    return result.data;
  },
  kakaoLogin: async (code) => {
    const result = await axios.get(`${KH_DOMAIN}/kakao/login?code=${code}`);
    return result.data;
  },
};
export default MemberApi;
