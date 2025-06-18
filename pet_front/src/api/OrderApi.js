import axios from 'axios';
import instance from '../api/axiosInstance'; // 인스턴스 불러오기

const KH_DOMAIN = 'http://localhost:8080';
const OrderApi = {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 주  문 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // <Order />
  order: async () => {
    const result = await instance.post(`/order`);
    return result.data;
  },

  // <OrderDetail /> 페이징
  getOrderDetailPageList: async (pages) => {
    const result = await instance.post(`/order/detail`, pages);
    console.log('응답 결과:', result);
    return result.data;
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결  제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 결제
  pay: async (payload) => {
    payload.goodsList.forEach((item) => {
      console.log(`결제 시도 => 상품 ID: ${item.goodsId}, 상품 수량: ${item.quantity}`);
    });
    const result = await instance.post(`/order/pay`, payload);
    try {
      if (result != null) {
        return result.data;
      } else {
        alert(`OrderApi.pay() null`);
      }
    } catch (err) {
      console.error('오류 발생:', err);
    }

    return result.data;
    //console.log(JSON.stringify(payload, null, 2));
  },
  findAddress: async () => {
    const result = await instance.get(`/goods/findaddress`);
    try {
      if (result != null) {
        return result.data;
      } else {
        alert(`OrderApi.findAddress() null`);
      }
    } catch (err) {
      console.error('오류 발생:', err);
    }
    return result.data;
  },
};

export default OrderApi;
