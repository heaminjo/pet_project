import axios from 'axios';
import instance from '../api/axiosInstance'; // 인스턴스 불러오기

const KH_DOMAIN = 'http://localhost:8080';
const GoodsApi = {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 장 바 구 니 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 장바구니 추가
  addToCart: async (goods) => {
    //alert(`장바구니 담기 => ${goods}`);

    console.log(`장바구니 담기 시도 => ${goods.goodsId}, 수량: ${goods.quantity}`);
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
  // // <Cart />
  // cartList: async () => {
  //   const result = await instance.get('/cart/list');
  //   alert(`GoodsApi의 cartList 호출완료 => ${JSON.stringify(result.data)} `);
  //   return result.data;
  // },
  // <Cart /> : 페이징 추가
  getCartPageList: async (pages) => {
    alert(`getPageList() 호출됨, pages = ${JSON.stringify(pages)}`);
    const result = await instance.post(`/cart/list`, pages);
    alert(`getPageList() 호출됨, result = ${result.data}`);
    return result.data;
  },

  // 찜
  favorite: async (goodsId) => {
    try {
      const result = await instance.post(`/goods/favorite/${goodsId}`);
      if (result.data != null) {
        alert(`찜 등록 완료 => ${JSON.stringify(result.data)}`);
        return result.data;
      }
    } catch (err) {}
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상  품 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // <GoodsList /> 전체 상품 리스트 출력 (메인) (완료)
  getGoodsPageList: async (pages) => {
    alert(`getGoodsPageList() 호출됨, pages = ${JSON.stringify(pages)}`);
    try {
      const result = await instance.post(`/goods/list`, pages);
      if (result.data != null) {
        console.log('📦 응답 결과:', result);
        alert(`getGoodsPageList() 호출됨, result = ${result.data}`);
        return result.data;
      }
    } catch (err) {}
  },

  // <Goods />
  regGoods: async (formData) => {
    try {
      const result = await instance.post('/goods/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (result.data != null) {
        alert(`상품등록 완료 => ${result.data}`);
        return result.data;
      }
    } catch (err) {
      console.error('상품 등록 실패:', err);
      alert('상품 등록 중 에러가 발생했습니다.');
    }
  },

  // 상품상세정보 (단일)
  goodsDetail: async () => {
    const result = await instance.get('/goods/detail/${goods_id}');
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
    const result = await axios.post(`${KH_DOMAIN}/goods/page/list`, pages);
    return result.data;
  },
  //배너 추가
  bannerInsert: async (newBanner) => {
    const result = await axios.post(`${KH_DOMAIN}/goods/banner/insert`, newBanner);
    return result.data;
  },
};

export default GoodsApi;
