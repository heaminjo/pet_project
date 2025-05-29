import { useNavigate, useParams } from 'react-router-dom';
import CartComp from './CartStyle';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function Cart() {
  const navigate = useNavigate();
  const cartImage1 = process.env.PUBLIC_URL + '/images/pic1.png';
  const seller = process.env.PUBLIC_URL + '/images/avatar.png';
  const [goods, setGoods] = useState([]);

  const cart = async () => {
    // const userName = localStorage.getItem('loginName');
    GoodsApi.cartList()
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    cart(); // 호출
  }, []);

  return (
    <CartComp>
      <div className='container'>
        <div className='top'>
          <h2> 장바구니 </h2>
        </div>
        <div className='body'>
          <div className='left'>
            {goods.map((item, index) => (
              <div className='prod' key={index}>
                <div className='prodleft'>
                  <img src={cartImage1} alt='상품1이미지' className='cartimage' onClick={() => navigate('/order', { state: { goods: item } })} />
                </div>
                <div className='prodright'>
                  <div>
                    <b>상품명</b>&nbsp;&nbsp;{item.goods_name}
                  </div>
                  <div>
                    <b>상세정보</b>&nbsp;&nbsp;{item.description}
                  </div>
                  <div>
                    <b>가격</b>&nbsp;&nbsp; {item.price}
                  </div>
                  <div>
                    <b>수량</b>&nbsp;&nbsp; {item.quantity}
                  </div>
                  <div>
                    <img src={seller} className='seller' alt='판매자' /> ROYAL CANIN
                  </div>
                  <div>내일 7시 도착</div>
                </div>
              </div>
            ))}
          </div>
          <div className='right'>
            <table>
              <tbody>
                <tr>
                  <td colSpan='2'>
                    <b>주문예상금액</b>
                  </td>
                </tr>
                <tr>
                  <td>상품가격</td>
                  <td>10000 원</td>
                </tr>
                <tr>
                  <td>배송비</td>
                  <td>3000 원</td>
                </tr>
                <tr>
                  <td>최종 가격</td>
                  <td>10000 원</td>
                </tr>
              </tbody>
            </table>
            <button className='buy' onClick={() => navigate('/pay')}>
              구매하기
            </button>
          </div>
        </div>
      </div>
    </CartComp>
  );
}
