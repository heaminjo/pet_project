import { useNavigate, useParams } from 'react-router-dom';
import CartComp from './CartStyle';
import { useEffect, useState } from 'react';
import { goodsApi } from '../../../api/GoodsApi.js';

export default function Cart() {
  const navigate = useNavigate();
  const cartImage1 = process.env.PUBLIC_URL + '/images/pic1.png';
  const seller = process.env.PUBLIC_URL + '/images/avatar.png';
  const [goods, setGoods] = useState(null);

  useEffect(() => {
    const uri = 'goods/cart';
    const userId = 'sss@green';
    goodsApi(uri, 'GET', token)
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {}); //apiCall
  });

  return (
    <CartComp>
      <div className='container'>
        <div className='top'>
          <h2> 장바구니 </h2>
        </div>
        <div className='body'>
          <div className='left'>
            <div className='prodleft'>
              <img src={cartImage1} alt='상품1이미지' className='cartimage' onClick={() => navigate('/purchase')} />
            </div>
            <div className='prodright'>
              <div>{}</div>
              <div>내일 7시 도착보장{/* product.desc */}</div>
              <div>12000원{/* product.price */}</div>
              <img src={seller} className='seller' alt='판매자' /> ROYAL CANIN
            </div>
          </div>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <div className='right'>
            <table>
              <tr>
                <td colSpan='2'>
                  <b>주문예상금액</b>
                </td>
              </tr>
              <br />
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
            </table>
            <button className='buy'>구매하기</button>
          </div>
        </div>
      </div>
    </CartComp>
  );
}
