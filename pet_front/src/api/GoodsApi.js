import axios from 'axios';
const KH_DOMAIN = 'http://localhost:8080';
const GoodsApi = {
  // 장바구니
  cartList: async () => {
    alert('GoodsApi의 cart 호출됨');
    //   headers = { 'Content-Type': 'multipart/form-data' }; // 'application/json'
    const result = await axios.get(`${KH_DOMAIN}/cart/list`, {
      headers: {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('accessToken')}`,
      },
    });
    alert(`GoodsApi의 cart 호출완료 => ${result.data} `);
    return result.data;
  },
};

export default GoodsApi;
