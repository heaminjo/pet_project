import axios from "axios";

//공통 설정을 갖는 axios 인스턴스
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

//요청 인터셉터 설정
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  //토큰이 존재하면
  if (token != null) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

//interceptors 을 통해 에러 상태코드에 따른 핸들링링
instance.interceptors.response.use(
  //성공한 응답일 경우 그대로 넘기지만
  //에러 일 경우 asycn 함수가 호출
  (response) => response,
  async (error) => {
    //error.config는 에러가 난 객체의 설정 정보보
    const originalRequest = error.config;
    console.log("401 에러 확인");

    //토큰이 만료되었을 경우
    if (error.response.status == 401 && !originalRequest._retry) {
      //계속 401 에러가 날경우 무한 요청 에러를 방지지
      originalRequest._retry = true;
      //리프레쉬 가져오기
    }
  }
);
export default instance;
