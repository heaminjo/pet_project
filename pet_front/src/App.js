import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./page/layout/Layout";
import Main from "./page/main/Main";
import React, { useState } from "react";
import Login from "./page/auth/Login";
import Join from "./page/auth/Join";
import MyPage from "./page/mypage/MyPage";

//컨텍스트(useContext)
//로그인 여부부를 전역변수로 뿌리기 위한것
export const PetContext = React.createContext();

//로그인 상태 변수
//dd
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    //Context로 감싸주기
    <PetContext.Provider value={{ isLogin, setIsLogin }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PetContext.Provider>
  );
}

export default App;
