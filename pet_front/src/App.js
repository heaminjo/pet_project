import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./page/layout/Layout";
import Main from "./page/main/Main";
import React, { useState } from "react";
import Login from "./page/auth/Login";
import Join from "./page/auth/Join";
import Cart from "./components/Layout/cart/Cart";
import Order from "./components/Layout/order/Order";
import OrderList from "./components/Layout/order/OrderList";
import Pay from "./components/Layout/pay/Pay";
import WithDraw from "./components/Layout/withdraw/WithDraw";
import MyPage from "./page/mypage/MyPage";
import MyEdit from "./page/mypage/MyEdit";
import Delivery from "./components/Layout/delivery/Delivery";
import AddGoods from "./components/Layout/goods/AddGoods";
import ModifyGoods from "./components/Layout/goods/ModifyGoods";
import UpdatePw from "./page/mypage/UpdatePw";
import BoardList from "./components/Board/BoardList";
import AdminPage from "./page/admin/AdminPage";
import UserList from "./page/admin/UserList";
import UserDetail from "./page/admin/UserDetail";
import WithDrawal from "./page/mypage/WithDrawal";
import MyInfo from "./page/mypage/MyInfo";
import MyBoardList from "./page/mypage/MyBoardList";
import WithDrawalComplete from "./page/main/WithDrawalComplete";
import UserStatistics from "./components/admin/UserStatistics";
import Statistice from "./page/admin/StatisticsPage";
import StatisticsPage from "./page/admin/StatisticsPage";

import BoardDetail from "./components/Board/BoardDetail";
import BoardInsertForm from "./components/Board/BoardInsertForm";
import BoardEditForm from "./components/Board/BoardEditForm";
import Error from "./page/main/Error";
import UserGrade from "./page/admin/UserGrade";
import GoodsList from "./components/Layout/goods/GoodsList";
import MyAddr from "./page/mypage/MyAddr";
import AddressInsert from "./components/mypage/AddressInsert";
import BannerSelect from "./page/admin/BannerSelect";

import Favorite from "./components/Layout/favorite/Favorite";

import Grade from "./page/main/Grade";
import MyGrade from "./page/mypage/MyGrade";
import BestSelect from "./page/admin/BestSelect";
import CategoryManage from "./page/admin/CategoryManage";
import Inventory from "./page/admin/Inventory";
import GoodsState from "./page/admin/GoodsState";

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
            <Route path="/grade" element={<Grade />} />
            <Route path="/goods/list" element={<GoodsList />} />
            <Route path="/goods/order" element={<Order />} />
            <Route path="user/mypage" element={<MyPage />}>
              <Route path="myinfo" element={<MyInfo />} />
              <Route path="myedit" element={<MyEdit />} />
              <Route path="mygrade" element={<MyGrade />} />
              <Route path="updatepw" element={<UpdatePw />} />
              <Route path="withdrawal" element={<WithDrawal />} />
              <Route path="myboardlist" element={<MyBoardList />} />
              <Route path="addr" element={<MyAddr />} />
              <Route path="cart/list" element={<Cart />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="orderlist" element={<OrderList />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="withdraw" element={<WithDraw />} />
              <Route path="pay" element={<Pay />} />
            </Route>
            <Route path="/admin/page" element={<AdminPage />}>
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="grade" element={<UserGrade />} />
              <Route path="userlist" element={<UserList />} />
              <Route path="userdetail" element={<UserDetail />} />
              <Route path="banner" element={<BannerSelect />} />
              <Route path="best" element={<BestSelect />} />
              <Route path="category" element={<CategoryManage />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="goods/state" element={<GoodsState />} />
            </Route>
            <Route path="/withcomplete" element={<WithDrawalComplete />} />
            <Route path="/admin/goods/add" element={<AddGoods />} />
            <Route path="/admin/goods/modify" element={<ModifyGoods />} />
            <Route path="/boardList/:category" element={<BoardList />} />
            <Route
              path="/boardDetail/:category/:board_id"
              element={<BoardDetail />}
            />
            <Route path="/boardInsertForm" element={<BoardInsertForm />} />
            <Route
              path="/boardEditForm/:category/:board_id"
              element={<BoardEditForm />}
            />
            <Route path="/error" element={<Error />} />
            <Route path="/user/order" element={<Order />} />
            <Route path="/user/withdraw" element={<WithDraw />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PetContext.Provider>
  );
}

export default App;
