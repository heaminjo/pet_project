import axios from "axios";
import instance from "../api/axiosInstance"; // 인스턴스 불러오기
import url from "../api/axiosInstance"; // 인스턴스 불러오기

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
    console.log("응답 결과:", result);
    return result.data;
  },

  // <OrderList /> : 주문취소
  withDraw: async (orderDetailId) => {
    console.log(`withDraw: ${orderDetailId}`);
    const result = await instance.post(`/order/withdraw/${orderDetailId}`);
    return result.data;
  },

  // [관리자] 전체 Order List
  orderList: async (pages) => {
    const result = await instance.post(`/order/list/all`, pages);
    console.log("응답 결과:", result);
    return result.data;
  },

  // [관리자] <OrderListAll />
  getAllOrderDetailList: async (pages) => {
    console.log(`OrderApi.getAllOrderDetailList`);
    try {
      const result = await instance.post(`/order/page/details`, pages); //
      return result?.data;
    } catch (err) {
      alert("오류 발생");
      console.error("오류 발생:", err);
    }
  },

  // [관리자] <DeliveryGoods>
  getAllOrderList: async (pages) => {
    console.log(`OrderApi.getAllOrderList`);
    try {
      const result = await instance.post(`/order/page/list`, pages); //
      return result?.data;
    } catch (err) {
      alert("오류 발생");
      console.error("오류 발생:", err);
    }
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 배  송 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  deliveryStatus: async (orderId) => {
    console.log(`OrderApi.deliveryStatus`);
    try {
      const result = await instance.post(`/order/delivery?orderId=${orderId}`); //
      return result?.data;
    } catch (err) {
      alert("오류 발생");
      console.error("오류 발생:", err);
    }
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결  제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 결제
  pay: async (payload) => {
    payload.goodsList.forEach((item) => {
      console.log(
        `결제 시도 => 상품 ID: ${item.goodsId}, 상품 수량: ${item.quantity}`
      );
    });
    try {
      const result = await instance.post(`/order/pay`, payload);
      if (result != null) {
        return result.data;
      } else {
        //alert(`OrderApi.pay() null`);
        console.log(`OrderApi.pay() null`);
        return;
      }
    } catch (err) {
      console.error("오류 발생:", err);
      return;
    }
  },

  // 할인율 조회
  getPayPrice: async (goods) => {
    try {
      console.log("goodsList:", goods);
      const result = await instance.post(`/order/pay/preview`, goods);
      if (result != null) {
        console.log(`findAddress 결과: ${result}`);
        return result.data;
      } else {
        //alert(`OrderApi.findAddress() null`);
        console.log(`OrderApi.findAddress() null`);
      }
    } catch (err) {
      console.error("오류 발생:", err);
    }
  },

  // 배송지 주소
  findAddress: async () => {
    const result = await instance.get(`/order/findaddress`);
    try {
      if (result != null) {
        console.log(`findAddress 결과: ${result}`);
        return result.data;
      } else {
        //alert(`OrderApi.findAddress() null`);
        console.log(`OrderApi.findAddress() null`);
      }
    } catch (err) {
      console.error("오류 발생:", err);
    }
    return result.data;
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리 뷰  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //
  // 리뷰 목록 출력 (나의 리뷰)
  // <MyReview /> 페이징
  getReviewsPageList: async (pages) => {
    // alert(`GoodsApi.getReviewPageList`);
    console.log(`GoodsApi.getReviewPageList`);
    const result = await instance.post(`/order/myreviews`, pages);
    console.log("응답 결과:", result);
    return result.data;
  },

  // 리뷰 등록 (사진 포함)
  // <Review />
  registerReview: async (formData) => {
    const result = await instance.post(`/order/review/register`, formData);
    return result.data;
  },
};

export default OrderApi;
