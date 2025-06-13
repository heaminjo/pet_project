import { useState, useEffect } from 'react';
import OrderComp from './OrderStyle.js';
import GoodsApi from '../../../api/GoodsApi';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { goods } = location.state || {};
  const prodImage = process.env.PUBLIC_URL + '/images/avatar.png';
  const [buyQuantity, setBuyQuantity] = useState(1);
  const EMPTY_HEART = '🤍';
  const FULL_HEART = '💖';
  const [heart, setHeart] = useState('🤍');
  const [stars, setStars] = useState(); // ⭐

  // 결제
  const pay = async (goods) => {
    alert(`결제페이지 이동 성공, 상품ID:  => ${goods.goodsId}`);
    const goodsWithQuantity = { ...goods, quantity: buyQuantity };
    navigate('/user/mypage/pay', { state: { goods: goodsWithQuantity } });
  };

  // 장바구니 담기
  const addToCart = async (goods) => {
    const goodsWithQuantity = { ...goods, quantity: buyQuantity };
    alert(`addToCart => ${goodsWithQuantity.quantity}`);
    GoodsApi.addToCart(goodsWithQuantity)
      .then((response) => {
        alert(`장바구니 담기 성공, 상품ID:  => ${response.goodsId}`);
        console.log(response);
      })
      .catch((err) => {});
  };

  // 별점
  const renderIcons = (rating) => {
    const filledStars = '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    setStars(filledStars);
  };

  // 찜
  const addFavorite = () => {
    alert(`goods Id => ${goods.goodsId}`);
    GoodsApi.favorite(goods.goodsId)
      .then((response) => {
        // 상태 토글
        if (heart === EMPTY_HEART) {
          setHeart('💖');
        } else if (heart === FULL_HEART) {
          setHeart('🤍');
        }
      })
      .catch((err) => {
        alert(`에러발생 => ${err}`);
      });
  };

  useEffect(() => {
    alert(`상품정보 확인: ${goods.goodsId}, ${goods.goodsName}, ${goods.goodsState}, ${goods.description}, ${goods.price}, 수량: ${goods.quantity}`);
    if (goods) {
      renderIcons(goods.rating || 0);
    }
  }, []);

  return (
    <OrderComp>
      <div className='container'>
        <h2>주문 페이지</h2>
        <section className='product'>
          <div className='left'>
            <img src={`http://localhost:8080/uploads/${goods.imageFile}`} alt={goods.goods_name} className='prodimg' />
          </div>
          <div className='right'>
            <div className='prodname' onClick={() => addFavorite()}>
              {goods.goodsName}&nbsp;&nbsp;{heart}
            </div>
            <p className='rating'>{stars} 11,624개 상품평</p>
            <hr />
            <div className='prodprice'>
              {goods.price} 원<span className='prodprice2'>(1kg당 1000원)</span>
            </div>
            <hr />
            <div className='seller'>
              <b>
                판매자 &nbsp;&nbsp; <img src={prodImage} alt='상품이미지' className='sellerimg' /> &nbsp;&nbsp; 몽냥마켓
              </b>
            </div>
            <div>
              <b>
                <label>구매가능 수량(재고)</label>
                &nbsp;&nbsp; <span style={{ color: 'red', fontWeight: 'bold' }}>{goods.quantity}</span>
              </b>
            </div>
            <div>
              <b>
                <label>구매 수량</label>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='number' min={1} max={goods.quantity} value={buyQuantity} onChange={(e) => setBuyQuantity(Number(e.target.value))} />
              </b>
            </div>
            <br />
            <hr />
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
