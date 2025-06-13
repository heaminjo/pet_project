import GoodsListComp from './GoodsListStyle.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoodsApi from '../../../api/GoodsApi';

export default function GoodsList() {
  const navigate = useNavigate();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const [goods, setGoods] = useState([]);
  const EMPTY_HEART = '🤍';
  const FULL_HEART = '💖';

  // // 검색기능
  // const params = new URLSearchParams(location.search);
  // const typeParam = params.get('type') || 'all';
  // const keywordParam = params.get('keyword') || '';
  // const sortParam = params.get('sort') || 'desc';
  // const pageParam = parseInt(params.get('page')) || 0;

  // 전체 상품 리스트 조회
  const goodsList = async () => {
    GoodsApi.showGoods()
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {});
  };

  // 상품1개 클릭시
  const clickProd = (item) => {
    alert(`clickProd 선택된 상품: ${item.goodsId}, ${item.goodsName}, ${item.goodsState}, ${item.description}, ${item.price}`);
    navigate('/goods/order', { state: { goods: item } });
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  useEffect(() => {
    goodsList();
    if (goods) {
      renderStars(goods.rating || 0);
    }
  }, []);

  // // 검색기능
  // useEffect(() => {
  //   setType(typeParam);
  //   setKeyword(keywordParam);
  //   setSort(sortParam);
  //   setPage(pageParam);
  // }, [typeParam, keywordParam, sortParam, pageParam]);

  return (
    <GoodsListComp>
      <div className='container'>
        <h2>상품 리스트 출력 페이지</h2>
        <div></div>
        <div className='body'>
          <h2>BEST SELLER</h2>
          <section className='list'>
            {goods.map((item, index) => (
              <div className='goodslist' key={index} onClick={() => clickProd(item)}>
                <img src={`http://localhost:8080/uploads/${item.imageFile}`} alt={item.goodsName} className='prodimg' />
                <div>
                  <b>{item.goodsName} </b>
                </div>
                <div>
                  {item.description} {', '}
                  {item.quantity} 개
                </div>
                <div>{item.price} 원</div>
                <div>
                  <span>{renderStars(item.rating)}</span>
                  <span style={{ color: 'red', fontSize: '12px' }}> {'( ' + item.review_num + ' )'} </span>
                </div>
              </div>
            ))}
          </section>
          <hr />
          <h2>자주 산 상품</h2>
          <section className='list1'>
            <img src={goodsImg} alt='' className='prodimg' />
            <div>상품명</div>
          </section>
          <hr />
          <h2>판매특가</h2>
          <section className='list2'></section>
        </div>
      </div>
    </GoodsListComp>
  );
}
