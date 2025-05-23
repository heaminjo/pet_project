import axios from 'axios';
const KH_DOMAIN = 'http://localhost:8080';
const GoodsApi = {
  // 장바구니
  cart: async (uri, token, userName) => {
    alert('GoodsApi의 cart 호출됨');
    // 1.1) headers
    let headers = { 'Content-Type': 'application/json' };
    //   headers = { 'Content-Type': 'multipart/form-data' };
    let url = `${KH_DOMAIN}/${uri}/${userName}`;
    // url: 'http://localhost:8080/goods/cart/이름',
    const result = await axios.get(url, { headers });
    return result.data;
  },
};

export default GoodsApi;
