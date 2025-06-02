import { useNavigate, useParams } from 'react-router-dom';
import CartComp from './CartStyle';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function Cart() {
  const navigate = useNavigate();
  const cartImage1 = process.env.PUBLIC_URL + '/images/pic1.png';
  const seller = process.env.PUBLIC_URL + '/images/avatar.png';
  const [goods, setGoods] = useState([]);
  const [checked, setChecked] = useState({}); // key: 인덱스 , value: 체크유무

  const cart = async () => {
    // const userName = localStorage.getItem('loginName');
    GoodsApi.cartList()
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {});
  };

  // 체크박스의 선택 상태를 토글
  const handleCheckboxChange = (index) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleBuyClick = () => {
    const isAnyChecked = Object.values(checked).some((value) => value);
    if (!isAnyChecked) {
      alert('최소 한 개 이상의 상품을 선택해 주세요!');
      return;
    }
    // 선택된 상품 넘기기
    const selectedGoods = goods.filter((_, idx) => checked[idx]);
    navigate('/user/pay', { state: { goods: selectedGoods } });
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
                  <label>
                    <input type='checkbox' checked={checked[index] || false} onChange={() => handleCheckboxChange(index)} required />
                  </label>
                  <img src={cartImage1} alt='상품1이미지' className='cartimage' onClick={() => navigate('/user/order', { state: { goods: item } })} />
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
            <button className='buy' onClick={handleBuyClick}>
              구매하기
            </button>
            <button className='buy' onClick={() => navigate('/')}>
              취소
            </button>
          </div>
        </div>
      </div>
    </CartComp>
  );
}
