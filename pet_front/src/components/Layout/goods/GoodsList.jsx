import GoodsListComp from './GoodsListStyle.js';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GoodsApi from '../../../api/GoodsApi';

export default function GoodsList() {
  const navigate = useNavigate();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const [goods, setGoods] = useState([]);

  const goodsList = async () => {
    GoodsApi.showGoods()
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {});
  };

  const clickProd = (item) => {
    alert(`선택된 상품: ${item.goods_name}, ${item.goods_state}, ${item.description}, ${item.price}`);
    navigate('/order', { state: { goods: item } });
  };

  useEffect(() => {
    goodsList();
  }, []);

  return (
    <GoodsListComp>
      <div className='container'>
        <h2>상품 리스트 출력 페이지</h2>
        <div className='body'>
          <h2>BEST SELLER</h2>
          <section className='list'>
            {goods.map((item, index) => (
              <div className='goodslist' key={index} onClick={() => clickProd(item)}>
                <img src={goodsImg} alt='' className='prodimg' />
                <div>{item.goods_name}</div>
                <div>{item.description}</div>
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
