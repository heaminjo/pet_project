import axios from 'axios';
const KH_DOMAIN = 'http://localhost:8080';
const GoodsApi = {
  // 장바구니
  cart: async (uri) => {
    alert('GoodsApi의 cart 호출됨');
    //   headers = { 'Content-Type': 'multipart/form-data' }; // 'application/json'
    let url = `${KH_DOMAIN}/${uri}`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('accessToken')}`,
      },
    });
    return result.data;
  },
};

export default GoodsApi;
