import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./page/layout/Layout";
import Main from "./page/main/Main";
import React, { useState } from "react";
import Login from "./page/auth/Login";
import Join from "./page/auth/Join";
import BoardList from "./components/Board/BoardList";
import BoardInsertForm from "./components/Board/BoardInsertForm";
import BoardDetail from "./components/Board/BoardDetail";
import BoardEditForm from "./components/Board/BoardEditForm";
import MyPage from "./page/mypage/MyPage";
import MyEdit from "./page/mypage/MyEdit";
import UpdatePw from "./page/mypage/UpdatePw";

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
            <Route path="/boardList" element={<BoardList isLogin={isLogin} />} />
            <Route path="/boardInsertForm" element={<BoardInsertForm />} />
            <Route path="/boardDetail/:board_Id" element={<BoardDetail />} />
            <Route path="/boardEditForm/:board_id" element={<BoardEditForm />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/myedit" element={<MyEdit />} />
            <Route path="/updatepw" element={<UpdatePw />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PetContext.Provider>
  );
}

export default App;
