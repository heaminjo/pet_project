import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./page/layout/Layout";
import Main from "./page/main/Main";
import Login from "./page/auth/Login";
import Join from "./page/auth/Join";
import RegisterPage from "./page/auth/RegisterPage";
import SearchPage from "./page/main/SearchPage";
import DetailPage from "./page/main/DetailPage";
import CategoryRegisterPage from "./page/main/CategoryRegisterPage";

export const PetContext = React.createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <PetContext.Provider value={{ isLogin, setIsLogin }}>
      <BrowserRouter>
        <Routes>
          {/* ✅ 기본 경로로 진입하면 /search로 리디렉션 */}
          <Route path="/" element={<Navigate to="/search" />} />

          {/* ✅ Layout 안에서 동작하는 페이지들 */}
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/main" element={<Main />} />
          </Route>

          {/* ✅ 단독 페이지들 */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/category/register" element={<CategoryRegisterPage />} />
        </Routes>
      </BrowserRouter>
    </PetContext.Provider>
  );
}

export default App;
