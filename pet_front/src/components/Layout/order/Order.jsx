import { useState, useEffect } from 'react';
import OrderComp from './OrderStyle.js';
import GoodsApi from '../../../api/GoodsApi';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderTab from './OrderTab.jsx';
import ReviewList from './ReviewList.jsx';

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { goods } = location.state || {};
  const prodImage = process.env.PUBLIC_URL + '/images/avatar.png';
  const imgUrl = 'http://localhost:8080/resources/webapp/userImages/';
  const [buyQuantity, setBuyQuantity] = useState(1);
  const EMPTY_HEART = '🤍';
  const FULL_HEART = '❤️';
  const [heart, setHeart] = useState('🤍');
  const [stars, setStars] = useState(); // ⭐

  const [activeTab, setActiveTab] = useState('상품상세');

  const data = [
    { label: '품명', value: goods.goodsName },
    { label: '크기 및 중량', value: goods.description },
    { label: '제품 구성', value: '컨텐츠 참조' },
  ];

  // 결제
  const pay = async (goods) => {
    console.log(`결제페이지 이동 성공, 상품ID:  => ${goods.goodsId}`);
    const goodsWithQuantity = { ...goods, quantity: buyQuantity };
    navigate('/user/mypage/pay', { state: { goods: goodsWithQuantity } });
  };

  // 장바구니 담기
  const addToCart = async (goods, buyQuantity) => {
    console.log(`addToCart 수량 => ${buyQuantity}`);
    GoodsApi.addToCart(goods, buyQuantity)
      .then((response) => {
        console.log(`장바구니 담기 성공, 상품ID:  => ${response}`);
      })
      .catch((err) => {
        alert('GoodsApi.addToCart() 중 오류발생');
      });
  };

  // 별점 (상품의 총 별점)
  const renderIcons = (rating) => {
    const filledStars = '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    setStars(filledStars);
  };

  // 찜 (적용)
  const addFavorite = () => {
    console.log(`찜한 상품의 goods Id => ${goods.goodsId}`);
    GoodsApi.favorite(goods.goodsId)
      .then((response) => {
        // 상태 토글
        if (heart === EMPTY_HEART) {
          setHeart('❤️');
        } else if (heart === FULL_HEART) {
          setHeart('🤍');
        }
      })
      .catch((err) => {
        alert(`에러발생 => ${err}`);
      });
  };

  // 찜 (불러오기)
  const favoriteInfo = () => {
    GoodsApi.favoriteInfo(goods.goodsId)
      .then((response) => {
        // 상태 토글
        if (response.data === 'TRUE') {
          setHeart(FULL_HEART);
        } else {
          setHeart(EMPTY_HEART);
        }
      })
      .catch((err) => {
        alert(`에러발생 => ${err}`);
      });
  };

  // 구매수량 제한한
  const setQuantity = (number) => {
    if (number > goods.quantity) {
      setBuyQuantity(goods.quantity);
    } else if (number < 1) {
      setBuyQuantity(1);
    } else {
      setBuyQuantity(number);
    }
  };

  useEffect(() => {
    console.log(`상품정보 확인: ${goods.goodsId}, ${goods.goodsName}, ${goods.goodsState}, ${goods.description}, ${goods.price}, 수량: ${goods.quantity}`);
    if (goods) {
      renderIcons(goods.rating || 0);
    }
    favoriteInfo();
  }, [goods]);

  return (
    <OrderComp>
      <div className='container'>
        <section className='product'>
          <div className='left'>
            <img src={`${imgUrl}${goods.imageFile}`} alt={goods.goodsName} className='prodimg' />
          </div>
          <div className='right'>
            <div className='prodname' onClick={() => addFavorite()}>
              {goods.goodsName}&nbsp;&nbsp;{heart}
            </div>
            <p className='rating' style={{ color: 'red', fontSize: '12px' }}>
              {stars}&nbsp;&nbsp;{'( ' + goods.reviewNum + ' 개 상품평 )'}
            </p>
            <hr />
            <div className='prodprice'>
              {goods.price} 원<span className='prodprice2'>(1kg당 1000원)</span>
            </div>
            <hr />
            <div>
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
                <input style={{ width: '80px', height: '20px' }} type='number' min={1} max={goods.quantity} value={buyQuantity} onChange={(e) => setQuantity(Number(e.target.value))} />
              </b>
            </div>
            <br />
            <hr />
            <br />
            <button className='btn1' onClick={() => addToCart(goods, buyQuantity)}>
              장바구니
            </button>
            &nbsp;&nbsp;
            <button className='btn2' onClick={() => pay(goods)}>
              바로구매
            </button>
          </div>
        </section>
        <hr />
        <div className='product-container'>
          <table className='product-table'>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <th className='product-th'>{item.label}</th>
                  <td className='product-td'>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='product-more'>필수 표기정보 더보기 ▼</div>
          <hr />
          <br />
          <OrderTab activeTab={activeTab} setActiveTab={setActiveTab} reviewNum={goods.reviewNum} />
          {activeTab === `상품평 (${goods.reviewNum})` && <ReviewList stars={stars} goodsId={goods.goodsId} reviewNum={goods.reviewNum} imgUrl={imgUrl} />}
        </div>
      </div>
    </OrderComp>
  );
}
