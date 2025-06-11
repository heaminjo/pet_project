import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './page/layout/Layout';
import Main from './page/main/Main';
import React, { useState } from 'react';
import Login from './page/auth/Login';
import Join from './page/auth/Join';
import Cart from './components/Layout/cart/Cart';
import Order from './components/Layout/order/Order';
import OrderDetail from './components/Layout/orderdetail/OrderDetail';
import Pay from './components/Layout/pay/Pay';
import WithDraw from './components/Layout/withdraw/WithDraw';
import MyPage from './page/mypage/MyPage';
import MyEdit from './page/mypage/MyEdit';
import Delivery from './components/Layout/delivery/Delivery';
import Goods from './components/Layout/goods/Goods';
import UpdatePw from './page/mypage/UpdatePw';
import BoardList from './components/Board/BoardList';
import AdminPage from './page/admin/AdminPage';
import UserList from './page/admin/UserList';
import UserDetail from './page/admin/UserDetail';
import WithDrawal from './page/mypage/WithDrawal';
import MyInfo from './page/mypage/MyInfo';
import WithDrawalComplete from './page/main/WithDrawalComplete';
import UserStatistics from './components/admin/UserStatistics';
import Statistice from './page/admin/StatisticsPage';
import StatisticsPage from './page/admin/StatisticsPage';

import BoardDetail from './components/Board/BoardDetail';
import BoardInsertForm from './components/Board/BoardInsertForm';
import BoardEditForm from './components/Board/BoardEditForm';
import Error from './page/main/Error';
import UserGrade from './page/admin/UserGrade';
import GoodsList from './components/Layout/goods/GoodsList';

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
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/goods/list' element={<GoodsList />} />
            <Route path='/goods/order' element={<Order />} />
            <Route path='user/mypage' element={<MyPage />}>
              <Route path='myinfo' element={<MyInfo />} />
              <Route path='myedit' element={<MyEdit />} />
              <Route path='updatepw' element={<UpdatePw />} />
              <Route path='withdrawal' element={<WithDrawal />} />
              <Route path='cart/list' element={<Cart />} />
              <Route path='delivery' element={<Delivery />} />
              <Route path='orderdetail' element={<OrderDetail />} />
              <Route path='withdraw' element={<WithDraw />} />
              <Route path='pay' element={<Pay />} />
            </Route>
            <Route path='/admin/page' element={<AdminPage />}>
              <Route path='statistics' element={<StatisticsPage />} />
              <Route path='grade' element={<UserGrade />} />
              <Route path='userlist' element={<UserList />} />
              <Route path='userdetail' element={<UserDetail />} />
            </Route>
            <Route path='/withcomplete' element={<WithDrawalComplete />} />
            <Route path='/boardList/:category' element={<BoardList />} />
            <Route path='/boardInsertForm' element={<BoardInsertForm />} />
            <Route path='/boardDetail/:category/:board_id' element={<BoardDetail />} />
            <Route path='/boardEditForm/:category/:board_id' element={<BoardEditForm />} />

            <Route path='/admin/goods' element={<Goods />} />
            <Route path='/boardList/:category' element={<BoardList />} />
            <Route path='/boardDetail/:category/:board_id' element={<BoardDetail />} />
            <Route path='/boardInsertForm' element={<BoardInsertForm />} />
            <Route path='/boardEditForm/:category/:board_id' element={<BoardEditForm />} />
            <Route path='/error' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PetContext.Provider>
  );
}

export default App;
