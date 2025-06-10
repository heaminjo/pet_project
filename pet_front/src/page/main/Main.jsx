import { useEffect } from "react";
import MainComp from "./MainStyle";
import Banner from "../../components/main/Banner";

export default function Main() {
  const kakao = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    try {
      const response = await fetch(
        `http://localhost:8080/kakao/login?code=${code}`,
        {
          method: "GET",
          credentials: "include", // 쿠키 받을 때 필요하면 추가
        }
      );
      const result = await response.json();

      if (result.success) {
        const accessToken = result.data.accessToken; // ApiResponse<TokenDTO> 구조에 맞게
        // 예) localStorage에 저장
        localStorage.setItem("loginName", result.data.memberName);
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("role", result.data.role);
        // 로그인 성공 처리(리다이렉트 등)
      } else {
        console.error("로그인 실패:", result.message);
      }
    } catch (err) {
      console.error("로그인 처리 중 에러:", err);
    }
  };

  return (
    <MainComp>
      <div className="mainInner">
        <h2>d</h2>
        <Banner />
      </div>
    </MainComp>
  );
}
