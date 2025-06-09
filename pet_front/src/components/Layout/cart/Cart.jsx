import { useNavigate, useParams } from 'react-router-dom';
import CartComp from './CartStyle';
import { useEffect, useRef, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function Cart() {
  const navigate = useNavigate();
  const cartImage1 = process.env.PUBLIC_URL + '/images/pic1.png';
  const seller = process.env.PUBLIC_URL + '/images/avatar.png';
  const [goods, setGoods] = useState([]);
  const [checked, setChecked] = useState({}); // key: 인덱스 , value: 체크유무
  const [quantityMap, setQuantityMap] = useState({}); // Map 용도( goods id : goods quantity )
  const deliverPrice = 3000;

  // Goods 정보 요청
  const cart = async () => {
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

  // 체크한 상품의 총금액 계산산 (quantityMap 이용)
  const getCheckedTotalPrice = () => {
    return goods.reduce((total, item, index) => {
      if (!checked[index]) return total; // 체크안된 상품 건너뜀 (누적X)
      const quantity = quantityMap[item.goods_id] || 1; //
      return total + item.price * quantity;
    }, 0);
  };

  // 구매버튼 클릭시 : 체크박스, 수량
  const handleBuyClick = () => {
    const isAnyChecked = Object.values(checked).some((value) => value);
    if (!isAnyChecked) {
      alert('최소 한 개 이상의 상품을 선택해 주세요!');
      return;
    }
    // 선택된 상품 넘기기
    const selectedGoods = goods
      .filter((_, idx) => checked[idx]) //
      .map((item) => ({
        ...item,
        quantity: quantityMap[item.goods_id] || 1,
      }));
    navigate('/user/pay', { state: { goods: selectedGoods } });
  };

  // 구매수량 조절 버튼
  const increase = (goodsId) => {
    // 상품의 최대 구매가능 수량(재고)
    const goodsMaxQuantity = goods.find((g) => g.goods_id === goodsId).quantity;

    setQuantityMap((prev) => {
      const currentQuantity = prev[goodsId] || 1; // 현재 수량
      if (goodsMaxQuantity - currentQuantity <= 0) {
        alert(`구매 가능 수량(${goodsMaxQuantity}) 초과 ===> 더 이상 구매할 수 없습니다.`);
        return prev;
      }
      return {
        ...prev, // 기존 quantityMap 객체 복사 (펼침연산자 - 상태 불변성immutable 유지위해)
        [goodsId]: currentQuantity + 1, // goodsId를 1만큼 증가
      };
    });
  };
  const decrease = (goodsId) => {
    setQuantityMap((prev) => {
      const currentQuantity = prev[goodsId] || 1; // 현재 수량
      if (currentQuantity <= 1) return prev;
      return {
        ...prev,
        [goodsId]: prev[goodsId] - 1,
      };
    });
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
                    <input type='checkbox' checked={checked[index] || false} onChange={() => handleCheckboxChange(index)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} required />
                    &nbsp;&nbsp;&nbsp;
                  </label>
                  <img src={`http://localhost:8080/uploads/${item.image_file}`} alt={item.goods_name} className='prodimg' onClick={() => navigate('/user/order', { state: { goods: item } })} />
                </div>
                <div className='prodright'>
                  <div>
                    <b>상품명</b>&nbsp;&nbsp;{item.goods_name}
                  </div>
                  <div>
                    <b>상세정보</b>&nbsp;&nbsp;{item.description}
                  </div>
                  <div>
                    <b>가격</b>&nbsp;&nbsp; {item.price} 원
                  </div>
                  <div>
                    <b>최대 구매 가능 수량</b>&nbsp;&nbsp; {item.quantity}
                  </div>
                  <div>
                    <b>장바구니 수량 </b> &nbsp;&nbsp;{item.cart_quantity}
                  </div>
                  <div>
                    <b>구매 수량 변경</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => decrease(item.goods_id)} style={{ width: '20px', height: '20px' }}>
                      -
                    </button>
                    &nbsp;&nbsp;<b style={{ color: 'red' }}> {quantityMap[item.goods_id] || 1}</b>&nbsp;&nbsp;
                    <button onClick={() => increase(item.goods_id)} style={{ width: '20px', height: '20px' }}>
                      +
                    </button>
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
                  <td> {getCheckedTotalPrice()} 원</td>
                </tr>
                <tr>
                  <td>배송비</td>
                  <td> {deliverPrice} 원</td>
                </tr>
                <tr>
                  <td>최종 가격</td>
                  <td> {getCheckedTotalPrice() + deliverPrice}원</td>
                </tr>
              </tbody>
            </table>
            <button className='buy' onClick={() => handleBuyClick()}>
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
