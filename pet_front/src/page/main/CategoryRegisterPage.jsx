import React, { useState } from 'react';
import api from '../../api/goodsApi';

function CategoryRegisterPage() {
  const [category, setCategory] = useState({ category_name: '', description: '' });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addCategory(category).then(() => alert('카테고리 추가 완료'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>카테고리 추가</h2>
      <input name="category_name" onChange={handleChange} placeholder="카테고리명" />
      <input name="description" onChange={handleChange} placeholder="설명" />
      <button type="submit">추가</button>
    </form>
  );
}

export default CategoryRegisterPage;
