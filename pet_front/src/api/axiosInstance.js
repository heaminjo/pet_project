import axios from "axios";
import MemberApi from "./MemberApi";

//공통 설정을 갖는 axios 인스턴스
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

//요청 인터셉터 설정(header에 토큰큰)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  //토큰이 존재하면
  if (token != null) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

//interceptors 을 통해 에러 상태코드에 따른 핸들링
instance.interceptors.response.use(
  //성공한 응답일 경우 그대로 넘기지만
  //에러 일 경우 asycn 함수가 호출
  (response) => response,
  async (error) => {
    //error.config는 에러가 난 객체의 설정 정보
    const originalRequest = error.config;

    //토큰이 만료되었을 경우
    if (error.response.status == 401 && !originalRequest._retry) {
      //계속 401 에러가 날경우 무한 요청 에러를 방지지
      originalRequest._retry = true;

      try {
        //리프레쉬 가져오기
        const response = await MemberApi.getRefresh();
        //새로 발급된 엑세스 토큰
        console.log(response);
        const newToken = response.data.accessToken;

        localStorage.setItem("accessToken", newToken);
        //요청 헤더에 새토큰 업데이트트
        originalRequest.headers["authorization"] = `Bearer ${newToken}`;

        //원래 실패했던 요청에 토큰를 다시 갱신 후 다시 요청청
        return instance(originalRequest);
      } catch (error) {
        //리프레쉬 토큰 만료 시 로그아웃 처리
        if (error.response?.data.code === "AUTH004") {
          alert("로그인 세션이 만료되었습니다.\n다시 로그인 하시길 바랍니다.");
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
