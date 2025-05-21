import React, { useEffect, useState } from 'react';
import api from '../api/goodsApi';

function CategoryBar({ onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.fetchCategories().then(res => setCategories(res.data));
  }, []);

  return (
    <div className="category-bar">
      {categories.map(cat => (
        <button key={cat.category_id} onClick={() => onSelect?.(cat.category_id)}>
          {cat.category_name}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
