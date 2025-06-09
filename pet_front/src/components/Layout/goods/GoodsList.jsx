import GoodsListComp from './GoodsListStyle.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoodsApi from '../../../api/GoodsApi';

export default function GoodsList() {
  const navigate = useNavigate();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const [goods, setGoods] = useState([]);

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
    alert(`clickProd 선택된 상품: ${item.goods_id}, ${item.goods_name}, ${item.goods_state}, ${item.description}, ${item.price}`);
    navigate('/user/order', { state: { goods: item } });
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
                <img src={`http://localhost:8080/uploads/${item.image_file}`} alt={item.goods_name} className='prodimg' />
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
