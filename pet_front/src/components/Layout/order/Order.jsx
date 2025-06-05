import { useState, useEffect } from 'react';
import OrderComp from './OrderStyle.js';
import GoodsApi from '../../../api/GoodsApi';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { goods } = location.state || {};
  const prodImage = process.env.PUBLIC_URL + '/images/pic2.png';
  const [buyQuantity, setBuyQuantity] = useState(1);
  // const options = {
  //   ...goods,

  // };

  const pay = async (goods) => {
    alert(`결제페이지 이동 성공, 상품ID:  => ${goods.goods_id}`);
    const goodsWithQuantity = { ...goods, quantity: buyQuantity };
    navigate('/user/pay', { state: { goods: goodsWithQuantity } });
  };

  const addToCart = async (goods) => {
    const goodsWithQuantity = { ...goods, quantity: buyQuantity };
    alert(`addToCart => ${goodsWithQuantity.quantity}`);
    GoodsApi.addToCart(goodsWithQuantity)
      .then((response) => {
        alert(`장바구니 담기 성공, 상품ID:  => ${response.goods_id}`);
        console.log(response);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    alert(`상품정보 확인: ${goods.goods_id}, ${goods.goods_name}, ${goods.goods_state}, ${goods.description}, ${goods.price}, 수량: ${goods.quantity}`);
  }, []);

  return (
    <OrderComp>
      <div className='container'>
        <h2>주문 페이지</h2>
        <section className='product'>
          <div className='left'>
            <img src={prodImage} alt='상품이미지' className='prodimage' />
          </div>
          <div className='right'>
            <div className='prodname'>{goods.goods_name}</div>
            <p className='rating'>⭐ 11,624개 상품평</p>
            <hr />
            <div className='prodprice'>
              {goods.price} 원<span className='prodprice2'>(1kg당 1000원)</span>
            </div>
            <hr />
            <div className='seller'>
              <img src={prodImage} alt='상품이미지' className='sellerimg' />
              판매자 &nbsp;&nbsp; ROYAL CANIN
            </div>
            <div>
              <label>수량: </label>
              <input type='number' min={1} max={goods.quantity} value={buyQuantity} onChange={(e) => setBuyQuantity(Number(e.target.value))} />
            </div>
            <br />
            <hr />
            <select className='options'>
              {/* {goods.map((q, idx) => ( // 1kg, 2kg, 등 수량 추가예정
                <div key={idx} className={`{q.disabled ? 'disabled': : ''}`} onClick={() => {}}>
                  <option>
                    {q.price}원
                  </option>
                </div>
              ))} */}
            </select>
            <br />
            <br />
            <button onClick={() => addToCart(goods)}>장바구니</button>&nbsp;&nbsp;
            <button onClick={() => pay(goods)}>바로구매</button>
          </div>
        </section>

        <section className='proddetail'>
          <h2>상세페이지</h2>
          <p>필수 표기정보</p>
          <table>
            <tbody>
              <tr>
                <th>품명</th>
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
        <div className='reviews'>후기목록</div>
      </div>
    </OrderComp>
  );
}
