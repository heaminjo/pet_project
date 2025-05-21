import axios from 'axios';

const BASE_URL = 'http://localhost:8081'; // 백엔드 주소

const api = {
  // 카테고리
  fetchCategories: () => axios.get(`${BASE_URL}/api/categories`),
  addCategory: (data) => axios.post(`${BASE_URL}/api/categories`, data),

  // 상품
  fetchGoods: () => axios.get(`${BASE_URL}/api/goods`),
  registerGoods: (data) => axios.post(`${BASE_URL}/api/goods`, data),
  searchGoods: (keyword) => axios.get(`${BASE_URL}/api/goods/search?keyword=${keyword}`),
  getGoodsDetail: (id) => axios.get(`${BASE_URL}/api/goods/${id}`),

  // 리뷰
  addReview: (data) => axios.post(`${BASE_URL}/api/reviews`, data),
  getReviews: (goodsId) => axios.get(`${BASE_URL}/api/reviews?goodsId=${goodsId}`)
};

export default api;
