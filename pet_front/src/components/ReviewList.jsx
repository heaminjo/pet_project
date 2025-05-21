import React, { useEffect, useState } from 'react';
import api from '../api/goodsApi';

function ReviewList({ goodsId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.getReviews(goodsId).then(res => setReviews(res.data));
  }, [goodsId]);

  return (
    <div>
      <h4>리뷰</h4>
      {reviews.map(r => (
        <div key={r.review_id}>
          <strong>{r.title} ({r.score}/5)</strong>
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
