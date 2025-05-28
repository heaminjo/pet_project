import GoodsListComp from './GoodsListStyle.js';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GoodsApi from '../../../api/GoodsApi';

export default function Order() {
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

  useEffect(() => {
    goodsList();
  }, []);

  return (
    <GoodsListComp>
      <div className='container'>
        <h2>상품 리스트 출력 페이지</h2>
        <div className='body'>
          <section className='list'>
            {goods.map((item, index) => (
              <div className='goodslist' key={index}>
                <img src={goodsImg} alt='' className='prodimg' />
                <div>{item.goods_name}</div>
                <div>{item.description}</div>
              </div>
            ))}
          </section>
          <hr />
          <h2>자주 산 상품</h2>
          <section className='list1'>
            <div className='goodslist'>
              <img src={goodsImg} alt='' className='prodimg' />
              <div>상품명</div>
            </div>
          </section>
          <h2>판매특가</h2>
          <section className='list2'></section>
        </div>
      </div>
    </GoodsListComp>
  );
}
