import axios from "axios";
import MemberApi from "./MemberApi";
const REACT_APP_KH_DOMAIN = "http://54.180.195.59:8080";
//공통 설정을 갖는 axios 인스턴스
const instance = axios.create({
  baseURL: process.env.REACT_APP_KH_DOMAIN,
});

const url = axios.create({
  baseURL: process.env.REACT_APP_KH_DOMAIN,
});

//요청 인터셉터
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  //토큰이 존재 할 경우 Header에 토큰을 담는다.
  if (token != null) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false; // 현재 요청중인지 확인
let requestQueue = [];

let navigate;
export const setNavigate = (navFn) => {
  navigate = navFn;
};

//응답 인터셉터
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

      //만약 현재 상태(리프레시 요청중인 상태)에서 isRefreshing이 false일 경우 true로 바꾼다.
      //처음에 들어온 요청 이후 또 들어오는 리프레쉬 요청을 잡을 수 있음
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          //리프레쉬 가져오기
          const response = await MemberApi.getRefresh();

          //새로 발급된 엑세스 토큰
          const newToken = response.data.accessToken;
          console.log("새로운 토큰 발급:", newToken);

          sessionStorage.setItem("accessToken", newToken);

          //요청 헤더에 새 토큰 업데이트
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          // 모든 대기 중이던 요청에 새 토큰 전달
          requestQueue.forEach((cb) => cb(newToken));
          requestQueue = [];
          //원래 실패했던 요청에 토큰를 다시 갱신 후 다시 요청청
          return instance(originalRequest);
        } catch (error) {
          requestQueue = []; // 실패한 경우도 큐는 초기화해야 함
          //리프레쉬 토큰 401 시 로그아웃 처리하고 다시 로그인 요청하도록 하게 에러 객체 전달
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          sessionStorage.clear();
          navigate("/login");
          return new Promise(() => {}); // 무한 pending 상태 → UI에 에러 전달 안 됨
        } finally {
          isRefreshing = false;
        }
      } else {
        //401 에러가 들어왔는데 isRefreshing이 true면 이미 요청 중인 상태

        return new Promise((resolve) => {
          //요청 대기 큐에 함수를 넣어놓는다.
          //리프레쉬 토큰이 오게된다면 token으로 들어가 해당 함수들을 실행하게 됌
          requestQueue.push((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
export default instance;
