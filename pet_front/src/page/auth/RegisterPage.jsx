import React, { useState } from 'react';
import api from '../../api/goodsApi';

function RegisterPage() {
  const [form, setForm] = useState({
    goods_name: '', price: '', description: '', quantity: '', category_id: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.registerGoods(form).then(() => alert('상품 등록 완료'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="goods_name" onChange={handleChange} placeholder="상품명" />
      <input name="price" type="number" onChange={handleChange} placeholder="가격" />
      <textarea name="description" onChange={handleChange} placeholder="설명" />
      <input name="quantity" type="number" onChange={handleChange} placeholder="수량" />
      <input name="category_id" onChange={handleChange} placeholder="카테고리ID" />
      <button type="submit">등록</button>
    </form>
  );
}

export default RegisterPage;
