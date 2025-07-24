import axios from 'axios';
import instance from '../api/axiosInstance'; // 인스턴스 불러오기

import { API_BASE_URL } from '../services/app-config';
const KH_DOMAIN = `${API_BASE_URL}`;

const OrderApi = {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 주  문 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // <Order /> : 주문하기
  order: async () => {
    const result = await instance.post(`/order`);
    return result.data;
  },

  // <OrderDetail /> 페이징 : 주문상세 보기
  getOrderDetailPageList: async (pages) => {
    const result = await instance.post(`/order/detail`, pages);
    console.log('응답 결과:', result);
    return result.data; // OrderDetailResponseDTO
  },

  // <OrderList /> : 주문취소 요청
  withDraw: async (payload) => {
    try {
      const result = await instance.post('/order/withdraw', payload);
      return result.data; // True / False / 잘못된 요청입니다.
    } catch (e) {
      alert(`OrderApi.withDraw 오류`);
    }
  },

  // <WithDrawList /> : 주문취소내역
  getWithDrawPageList: async (pages) => {
    try {
      const result = await instance.post('/order/withdraw/list', pages); // WithdrawResponseDTO
      console.log(`getWithDrawPageList result = `, result.data);
      return result.data; //
    } catch (e) {
      alert(`OrderApi.getWithDrawPageList 오류`);
    }
  },

  // [관리자] 전체 Order List
  orderList: async (pages) => {
    const result = await instance.post(`/order/list/all`, pages);
    console.log('응답 결과:', result);
    return result.data;
  },

  // [관리자] <OrderListAll />
  getAllOrderDetailList: async (pages) => {
    console.log(`OrderApi.getAllOrderDetailList`);
    try {
      const result = await instance.post(`/order/page/details`, pages); //
      return result?.data;
    } catch (err) {
      alert('오류 발생');
      console.error('오류 발생:', err);
    }
  },

  // [관리자] <DeliveryGoods>
  getAllOrderList: async (pages) => {
    console.log(`OrderApi.getAllOrderList`);
    try {
      const result = await instance.post(`/order/page/list`, pages); //
      return result?.data;
    } catch (err) {
      alert('오류 발생');
      console.error('오류 발생:', err);
    }
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 배  송 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  deliveryStatus: async (orderDetailId) => {
    // ORDERSTATE.BEFOREPAY ...
    console.log(`OrderApi.deliveryStatus`);
    // alert(`OrderApi.deliveryStatus`);
    try {
      const result = await instance.post(`/delivery/status?orderDetailId=${orderDetailId}`); // ORDERSTATE 반환
      return result?.data;
    } catch (err) {
      alert('오류 발생');
      console.error('오류 발생:', err);
    }
  },

  // 배송지 주소
  findAddress: async () => {
    const result = await instance.get(`/delivery/findAddress`);
    try {
      if (result != null) {
        console.log(`findAddress 결과: ${result}`);
        return result.data;
      } else {
        //alert(`OrderApi.findAddress() null`);
        console.log(`OrderApi.findAddress() null`);
      }
    } catch (err) {
      console.error('오류 발생:', err);
    }
    return result.data;
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결  제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 결제
  pay: async (payload) => {
    payload.goodsList.forEach((item) => {
      console.log(`결제 시도 => 상품 ID: ${item.goodsId}, 상품 수량: ${item.quantity}`);
    });
    try {
      const result = await instance.post(`/pay`, payload);
      if (result != null) {
        return result.data;
      } else {
        //alert(`OrderApi.pay() null`);
        console.log(`OrderApi.pay() null`);
        return;
      }
    } catch (err) {
      console.error('오류 발생:', err);
      return;
    }
  },

  // 할인율 조회
  getPayPrice: async (goods) => {
    try {
      console.log('goodsList:', goods);
      const result = await instance.post(`/pay/preview`, goods);
      if (result != null) {
        console.log(`getPayPrice 결과: ${result}`);
        return result.data;
      } else {
        //alert(`OrderApi.findAddress() null`);
        console.log(`OrderApi.getPayPrice() null`);
      }
    } catch (err) {
      console.error('오류 발생:', err);
    }
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리 뷰  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //
  // 리뷰 목록 출력 (나의 리뷰)s
  // <MyReview /> 페이징
  getReviewsPageList: async (pages) => {
    // alert(`GoodsApi.getReviewPageList`);
    console.log(`GoodsApi.getReviewPageList`);
    const result = await instance.post(`/review/my`, pages);
    console.log('응답 결과:', result);
    return result.data;
  },

  // 리뷰 중복등록 방지 검증
  getReviewState: async (orderDetailId) => {
    // 리턴: reviewId
    const result = await instance.get(`/review/state/${orderDetailId}`);
    return result.data;
  },

  // 리뷰 등록 (사진 포함)
  // <Review />
  registerReview: async (formData) => {
    const result = await instance.post(`/review/register`, formData);
    return result.data;
  },

  // 리뷰 수정 (사진 포함)
  // <Review />
  updateReview: async (formData) => {
    const result = await instance.post(`/review/update`, formData);
    return result.data;
  },

  // 리뷰삭제
  deleteReview: async (reviewId) => {
    const result = await instance.get(`/review/delete/${reviewId}`);
    return result.data;
  },
};

export default OrderApi;
