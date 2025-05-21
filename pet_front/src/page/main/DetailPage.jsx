import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/goodsApi';
import ReviewList from '../../components/ReviewList';
import './DetailPage.css';

function DetailPage() {
  const { id } = useParams();
  const [goods, setGoods] = useState(null);
  const [review, setReview] = useState({ title: '', content: '', score: 5 });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.fetchGoods().then(res => {
      const found = res.data.find(g => String(g.goods_id) === id);
      setGoods(found);
    });
  }, [id]);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review_data = {
      ...review,
      goods_id: goods.goods_id,
      member_id: 1,
      order_detail_id: 1
    };
    api.addReview(review_data).then(() => alert('리뷰 등록 완료'));
  };

  const handlePurchase = () => {
    if (quantity < 1) return alert('최소 1개 이상 선택해주세요.');
    const total = goods.price * quantity;
    alert(`총 ${quantity}개 구매 (${total.toLocaleString()}원)`);
  };

  if (!goods) return <p>로딩 중...</p>;

  const total_price = (goods.price * quantity).toLocaleString();

  return (
    <div className="detail-container">
      <div className="detail-left">
        <img src={goods.image_file} alt={goods.goods_name} />
      </div>

      <div className="detail-right">
        <h2>{goods.goods_name}</h2>
        <p className="price">{total_price}원</p>
        <p className="description">{goods.description}</p>

        <div className="quantity-box">
          <label>수량: </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <div className="button-box">
          <button>장바구니</button>
          <button onClick={handlePurchase}>구매하기</button>
        </div>
      </div>

      <div className="review-section">
        <h3>리뷰 등록</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" onChange={handleChange} placeholder="리뷰 제목" />
          <textarea name="content" onChange={handleChange} placeholder="리뷰 내용" />
          <input name="score" type="number" min="1" max="5" onChange={handleChange} />
          <button type="submit">리뷰 등록</button>
        </form>

        <h3>리뷰</h3>
        <ReviewList goodsId={goods.goods_id} />
      </div>
    </div>
  );
}

export default DetailPage;
