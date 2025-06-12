import axios from "axios";
import instance from "../api/axiosInstance"; // 인스턴스 불러오기

const KH_DOMAIN = "http://localhost:8080";
const GoodsApi = {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 장 바 구 니 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 장바구니 추가
  addToCart: async (goods) => {
    //alert(`장바구니 담기 => ${goods}`);

    console.log(
      `장바구니 담기 시도 => ${goods.goodsId}, 수량: ${goods.quantity}`
    );
    const result = await instance.post("/cart/add", goods);
    try {
      if (result.data != null) {
        console.log("장바구니 담기 완료");
        return result.data;
      } else {
        console.log("장바구니 담기 실패");
      }
    } catch (err) {
      console.error("장바구니 추가 실패:", err);
      alert("장바구니 추가 중 에러가 발생했습니다.");
    }
  },
  // // <Cart />
  // cartList: async () => {
  //   const result = await instance.get('/cart/list');
  //   alert(`GoodsApi의 cartList 호출완료 => ${JSON.stringify(result.data)} `);
  //   return result.data;
  // },
  // <Cart /> : 페이징 추가
  getPageList: async (pages) => {
    alert(`getPageList() 호출됨, pages = ${JSON.stringify(pages)}`);
    const result = await instance.post(`/cart/list`, pages);
    alert(`getPageList() 호출됨, result = ${result.data}`);
    return result.data;
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상  품 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // <GoodsList /> 전체 상품 리스트 출력 (메인) (완료)
  showGoods: async () => {
    try {
      const result = await instance.get("/goods/list");
      if (result.data != null) {
        alert(`상품 리스트 호출 완료 => ${JSON.stringify(result.data)}`);
        return result.data;
      }
    } catch (err) {}
  },

  // (order_id)로 주문한 상품의 오더정보 / 상품정보
  customerGoodsHistory: async (orderIds) => {
    console.log("🔥 주문 ID 리스트:", orderIds);
    alert("GoodsApi customerGoodsHistory");
    try {
      const result = await instance.post("/goods/orderinfo", orderIds);
      if (result.data != null) {
        console.log(
          `구매이력 상품 호출 완료 => ${JSON.stringify(result.data)}`
        );
        return result.data;
      }
    } catch (err) {}
  },

  // <Goods />
  regGoods: async (formData) => {
    try {
      const result = await instance.post("/goods/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.data != null) {
        alert(`상품등록 완료 => ${result.data}`);
        return result.data;
      }
    } catch (err) {
      console.error("상품 등록 실패:", err);
      alert("상품 등록 중 에러가 발생했습니다.");
    }
  },

  // 상품상세정보 (단일)
  goodsDetail: async () => {
    const result = await instance.get("/goods/detail/${goods_id}");
    return result.data;
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 주  문 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // <Order />
  order: async () => {
    const result = await instance.post(`/goods/order`);
    return result.data;
  },

  // <OrderDetail />
  orderList: async () => {
    const result = await instance.get("/goods/ordered");
    return result.data;
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 결  제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 결제
  pay: async (payload) => {
    payload.goodsList.forEach((item) => {
      console.log(
        `결제 시도 => 상품 ID: ${item.goodsId}, 상품 수량: ${item.quantity}`
      );
    });
    const result = await instance.post(`/goods/pay`, payload);
    try {
      if (result != null) {
        return result.data;
      } else {
        alert(`GoodsApi.pay() null`);
      }
    } catch (err) {
      console.error("오류 발생:", err);
      alert("GoodsApi.pay() 수행중 에러발생.");
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
        alert(`GoodsApi.findAddress() null`);
      }
    } catch (err) {
      console.error("오류 발생:", err);
      alert("GoodsApi.findAddress() 수행중 에러발생.");
    }
    return result.data;
  },

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

  //배너 가져오기
  getBanner: async () => {
    const result = await axios.get(`${KH_DOMAIN}/goods/banner/list`);
    return result.data;
  },

  //카테고리 목록 가져오기
  getCategoryList: async () => {
    const result = await axios.get(`${KH_DOMAIN}/goods/category/list`);
    return result.data;
  },
  //상품 페이징 목록록
  getGoodsList: async (pages) => {
    const result = await axios.get(`${KH_DOMAIN}/goods/page/list`, pages);
    return result.data;
  },
};

export default GoodsApi;
