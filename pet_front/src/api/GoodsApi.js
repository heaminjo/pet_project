import axios from 'axios';
const KH_DOMAIN = 'http://localhost:8080';
const GoodsApi = {
  // 장바구니
  cartList: async () => {
    // alert('GoodsApi의 cart 호출됨');
    //   headers = { 'Content-Type': 'multipart/form-data' }; // 'application/json'
    const result = await axios.get(`${KH_DOMAIN}/cart/list`, {
      headers: {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('accessToken')}`,
      },
    });
    // alert(`GoodsApi의 cart 호출완료 => ${JSON.stringify(result.data)} `);
    return result.data;
  },
  regGoods: async (goods) => {
    try {
      const result = await axios.put(`${KH_DOMAIN}/goods/register`, goods, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('accessToken')}`,
        },
      });
      return result.data;
    } catch (err) {
      throw err;
    }
  },
};

export default GoodsApi;
