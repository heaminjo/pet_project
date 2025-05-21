import React from 'react';
import { Link } from 'react-router-dom';
import './GoodsCard.css'; // ✅ 스타일 연결

function GoodsCard({ goods }) {
  return (
    <div className="goods-card">
      <Link to={`/detail/${goods.goods_id}`}>
        <img src={goods.image_file} alt={goods.goods_name} />
        <h3>{goods.goods_name}</h3>
        <p>{goods.price.toLocaleString()}원</p>
      </Link>
    </div>
  );
}

export default GoodsCard;
