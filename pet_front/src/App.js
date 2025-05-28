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
import Delivery from './components/Layout/delivery/Delivery';
import Goods from './components/Layout/goods/Goods';
import GoodsList from './components/Layout/goods/GoodsList';
import MyEdit from './page/mypage/MyEdit';
import UpdatePw from './page/mypage/UpdatePw';
import BoardList from './components/Board/BoardList';

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
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/myedit' element={<MyEdit />} />
            <Route path='/updatepw' element={<UpdatePw />} />
            <Route path='/boardList' element={<BoardList />} />
            <Route path='/cart/list' element={<Cart />} />
            <Route path='/delivery' element={<Delivery />} />
            <Route path='/order' element={<Order />} />
            <Route path='/orderdetail' element={<OrderDetail />} />
            <Route path='/withdraw' element={<WithDraw />} />
            <Route path='/pay' element={<Pay />} />
            <Route path='/goods' element={<Goods />} />
            <Route path='/goodslist' element={<GoodsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PetContext.Provider>
  );
}

export default App;
