import axios from 'axios';
import instance from '../api/axiosInstance'; // 인스턴스 불러오기

const KH_DOMAIN = 'http://localhost:8080';
const GoodsApi = {
  // 장바구니 추가
  addToCart: async (goods) => {
    //alert(`장바구니 담기 => ${goods}`);
    console.log(`장바구니 담기 시도 => ${goods.goods_id}, 수량: ${goods.quantity}`);
    const result = await instance.post('/cart/add', goods);
    try {
      if (result.data != null) {
        console.log('장바구니 담기 완료');
        return result.data;
      } else {
        console.log('장바구니 담기 실패');
      }
    } catch (err) {
      console.error('장바구니 추가 실패:', err);
      alert('장바구니 추가 중 에러가 발생했습니다.');
    }
  },

  // 장바구니 출력 (완료)
  cartList: async () => {
    const result = await instance.get('/cart/list');
    // alert(`GoodsApi의 cart 호출완료 => ${JSON.stringify(result.data)} `);
    return result.data;
  }, // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 상품 리스트 출력 (메인) (완료)
  showGoods: async () => {
    try {
      const result = await instance.get('/goods/list');
      if (result.data != null) {
        alert(`상품 리스트 호출 완료 => ${JSON.stringify(result.data)}`);
        return result.data;
      }
    } catch (err) {}
  },

  // 상품등록 (완료)
  regGoods: async (goods) => {
    try {
      const result = await instance.post('/goods/register', goods);
      if (result.data != null) {
        alert(`상품등록 완료 => ${result.data}`);
        return result.data;
      }
    } catch (err) {
      console.error('상품 등록 실패:', err);
      alert('상품 등록 중 에러가 발생했습니다.');
    }
  }, // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 주문등록
  order: async () => {
    const result = await instance.post(`/goods/add`);
    return result.data;
  }, // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 결제
  pay: async () => {
    const result = await instance.post(`/goods/pay`);

    return result.data;
  }, // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // // 상품등록 (기존 axios 사용한 코드 - 예시)
  // regGoods: async (goods) => {
  //   try {
  //     const result = await axios.post(`${KH_DOMAIN}/goods/register`, goods, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('accessToken')}`,
  //       },
  //     });
  //     if (result.data != null) {
  //       alert(`상품등록 완료 => ${result.data}`);
  //       return result.data;
  //     }
  //   } catch (err) {
  //     console.error('상품 등록 실패:', err);
  //     alert('상품 등록 중 에러가 발생했습니다.');
  //   }
  // }, // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};

export default GoodsApi;
