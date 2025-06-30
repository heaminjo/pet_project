import { useNavigate, useParams } from 'react-router-dom';
import CartComp from './CartStyle';
import { useEffect, useRef, useState } from 'react';
import PageNumber from '../../../util/PageNumber';
import GoodsApi from '../../../../api/GoodsApi';
import MemberApi from '../../../../api/MemberApi';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Cart() {
  const navigate = useNavigate();
  // const cartImage1 = process.env.PUBLIC_URL + '/images/pic1.png';
  const seller = process.env.PUBLIC_URL + '/images/avatar.png';
  const deliverPrice = 3000; // 배달료 (현재 고정)

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods
  const [checked, setChecked] = useState({}); // key: 인덱스 , value: 체크유무
  const [quantityMap, setQuantityMap] = useState({}); // Map 용도( goods id : goods quantity )
  const [member, setMember] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0); // 등급별 할인율

  const [stars, setStars] = useState(); // ⭐

  // 페이징 관련 상태변수
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0); // 1 페이지, 2 페이지, ...

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // 유저가 매긴 별점
  const renderStars = (rating) => {
    // return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    const stars = [];
    const fullStars = Math.floor(rating); // 채운 별 수
    const emptyStars = 5 - fullStars; // 빈 별 수
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color='gold' size={20} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color='lightgray' size={20} />);
    }
    return stars;
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 체크박스 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 체크박스의 선택 상태를 토글
  const handleCheckboxChange = (goodsId) => {
    setChecked((prev) => ({
      ...prev,
      [goodsId]: !prev[goodsId],
    }));
  };

  // 체크한 상품의 총금액 계산 (quantityMap 이용)
  const getCheckedTotalPrice = () => {
    return goods.reduce((total, item, index) => {
      if (!checked[item.goodsId]) return total; // 체크안된 상품 건너뜀 (누적X)
      const quantity = quantityMap[item.goodsId] || 1; //
      return total + item.price * quantity;
    }, 0);
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 구매 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 구매버튼 클릭시 : 체크박스, 수량
  const handleBuyClick = () => {
    const isAnyChecked = Object.values(checked).some((value) => value);
    if (!isAnyChecked) {
      alert('최소 한 개 이상의 상품을 선택해 주세요!');
      return;
    }
    // 선택된 상품
    const selectedGoods = goods
      .filter((item) => checked[item.goodsId])
      // 재고수량 검증을 위해 인덱스 기반에서 goods_id 기준으로 변경
      .map((item) => ({
        ...item,
        quantity: quantityMap[item.goodsId],
        imageFile: item.imageFile,
      }));

    // 재고수량 검증
    for (const item of selectedGoods) {
      const selectedQuantity = item.quantity;
      const selected = goods.find((g) => g.goodsId === item.goodsId);
      // 선택된 상품 null 검사
      if (!selected) {
        alert(`상품 정보를 찾을 수 없습니다.`);
        return;
      }
      // 구매가능 수량 비교
      const goodsMaxQuantity = selected.quantity;
      if (goodsMaxQuantity < selectedQuantity) {
        alert(`상품 "${item.goodsName}"의 구매 수량(${selectedQuantity})이 재고(${goodsMaxQuantity})를 초과하였습니다.\n수량을 다시 조정해주세요.`);
        return;
      }
    }
    // 유효성 통과 시 결제 페이지 이동
    navigate('/user/mypage/pay', { state: { goods: selectedGoods } });
    // => <Cart /> <Order /> 공통으로 쓰는 로직이므로, 해당 줄은 변경하지 않기로 한다.
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~ 등급별 할인율 적용 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 등급별 할인율
  const gradeDiscountRate = {
    새싹회원: 0,
    초급회원: 0.05,
    중급회원: 0.07,
    상급회원: 0.1,
    프리미엄회원: 0.2,
  };

  // 할인 계산 함수
  const getDiscountAmount = (total, grade) => {
    const rate = gradeDiscountRate[grade] || 0;
    return Math.floor(total * rate); // 소수점 버림
  };

  // 구매수량 조절 버튼
  const increase = (goodsId) => {
    // 상품의 최대 구매가능 수량(재고)
    const goodsMaxQuantity = goods.find((g) => g.goodsId === goodsId).quantity;

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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const getPageList = async () => {
    const pages = {
      page: page,
      size: 5,
      sortBy: sort,
      keyword: keyword,
      type: type,
    };
    try {
      const result = await GoodsApi.getCartPageList(pages);
      // 1. 상품 목록
      setGoods(result.content);
      console.log(result.content);
      // 2. 수량 맵 초기화
      const initialQuantityMap = {};
      result.content.forEach((item) => {
        initialQuantityMap[item.goodsId] = item.cartQuantity; // 장바구니 수량반영
        // Map - 객체의 속성(key) 동적으로 접근
        // obj["name"] = "Tom" ===>	"name" 키 추가	{ name: "Tom" }
      });
      setQuantityMap(initialQuantityMap);

      // 3. 페이지번호 정보
      let temp = Math.floor(page / 5) * 5;
      setPaging({
        start: temp,
        end: Math.min(temp + 5, result.totalPages),
        isPrev: result.prev,
        isNext: result.next,
        totalElement: result.totalElements,
        totalPages: result.totalPages,
      });
    } catch (err) {
      console.error('getPageList 실패: ', err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getPageList();
    // 사용자 정보
    MemberApi.detail()
      .then((response) => {
        setMember(response);
      })
      .catch((err) => {});

    // 등급별 할인금액 산출
    setDiscount(getDiscountAmount(getCheckedTotalPrice(), member.grade));
  }, [page]);

  // 체크박스 상태, 수량변경, 등급변경 감지
  useEffect(() => {
    const total = getCheckedTotalPrice();
    setTotalPrice(total);
    setDiscount(getDiscountAmount(total, member.grade));
  }, [checked, quantityMap, member]);

  return (
    <CartComp>
      <div className='cart-container'>
        <div className='top'>
          <h2> 장바구니 </h2>
        </div>
        <div className='body'>
          <div className='left'>
            {goods.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>아직 장바구니에 담긴 상품이 없습니다.</div>
            ) : (
              goods.map((item, index) => (
                <div className='prod' key={index}>
                  <div className='prodleft'>
                    <label>
                      <input
                        type='checkbox'
                        checked={checked[item.goodsId] || false}
                        onChange={() => handleCheckboxChange(item.goodsId)}
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                        required
                      />
                      &nbsp;&nbsp;&nbsp;
                    </label>
                    <div>
                      <img src={`${item.imageFile}`} alt={item.goodsName} className='prodimg' onClick={() => navigate('/goods/order', { state: { goods: item } })} />
                      <p className='rating' style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>
                        {renderStars(item.rating)}
                      </p>
                    </div>
                  </div>
                  <div className='prodright' style={{ alignContent: 'center' }}>
                    <div>
                      <b>상품명</b>&nbsp;&nbsp;{item.goodsName}
                    </div>
                    <div>
                      <b>상세정보</b>&nbsp;&nbsp;{item.description}
                    </div>
                    <div>
                      <b>가격</b>&nbsp;&nbsp; {item.price} 원
                    </div>

                    {item.quantity < (quantityMap[item.goodsId] || 1) ? (
                      <>
                        <div>
                          <b>최대 구매 가능 수량</b>&nbsp;&nbsp;
                          <b style={{ color: 'red' }}> {item.quantity} </b>
                          &nbsp;
                        </div>
                        <div>
                          <b>구매 수량 </b>&nbsp;&nbsp;
                          <button onClick={() => decrease(item.goodsId)} style={{ width: '20px', height: '20px' }}>
                            -
                          </button>
                          &nbsp;&nbsp;
                          <b style={{ color: 'red' }}> {quantityMap[item.goodsId] || 1}</b>
                          &nbsp;&nbsp;
                          <button onClick={() => increase(item.goodsId)} style={{ width: '20px', height: '20px' }}>
                            +
                          </button>
                          &nbsp;&nbsp;
                          <span style={{ color: 'red', fontSize: '12px' }}>수량을 조절해 주세요. </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <b>최대 구매 가능 수량&nbsp;&nbsp; {item.quantity} </b>
                        </div>
                        <div>
                          <b>구매 수량 </b>&nbsp;&nbsp;
                          <button onClick={() => decrease(item.goodsId)} style={{ width: '20px', height: '20px' }}>
                            -
                          </button>
                          &nbsp;&nbsp;<b> {quantityMap[item.goodsId] || 1}</b>
                          &nbsp;&nbsp;
                          <button onClick={() => increase(item.goodsId)} style={{ width: '20px', height: '20px' }}>
                            +
                          </button>
                        </div>
                      </>
                    )}

                    <div>
                      <b>판매원</b>&nbsp;&nbsp;
                      <img src={seller} className='seller' alt='판매원' /> 몽냥마켓
                    </div>
                  </div>
                </div>
              ))
            )}
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
                  <td>
                    <b>{totalPrice} 원</b>
                  </td>
                </tr>
                <tr>
                  <td>배송비</td>
                  <td>
                    <b>{deliverPrice} 원</b>
                  </td>
                </tr>
                <tr>
                  <td>등급별 할인</td>
                  <td>
                    <b style={{ color: 'red' }}>- {discount} 원</b>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontSize: '16px' }}>최종 결제금액</td>
                  <td>
                    <b style={{ fontSize: '16px' }}>{totalPrice + deliverPrice - discount} 원 </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className='buy' onClick={() => handleBuyClick()}>
              구매하기
            </button>
            <button className='cancel' onClick={() => navigate('/')}>
              취소
            </button>
          </div>
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </CartComp>
  );
}
