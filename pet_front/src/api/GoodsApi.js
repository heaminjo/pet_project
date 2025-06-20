import axios from 'axios';
import instance from '../api/axiosInstance'; // 인스턴스 불러오기
import { useNavigate } from 'react-router-dom';

const KH_DOMAIN = 'http://localhost:8080';

const GoodsApi = {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 장 바 구 니 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 장바구니 추가
  addToCart: async (goods, buyQuantity) => {
    alert(`장바구니 담기 => ${goods.goodsName}`);
    const { goodsId } = goods;
    const query = `goodsId=${goodsId}&quantity=${buyQuantity}`;
    console.log(`장바구니 담기 시도 => ${goodsId}, 수량: ${buyQuantity}`);
    const result = await instance.post(`/cart/add?${query}`);
    try {
      if (result.data != null) {
        console.log(`장바구니 담기 성공, 상품ID: ${result.data.goodsId}`);
        return result.data;
      } else {
        console.log('장바구니 담기 실패');
      }
    } catch (err) {
      console.error('장바구니 추가 실패:', err);
      alert('장바구니 추가 중 에러가 발생했습니다.');
    }
  },

  // <Cart /> : 페이징 추가
  getCartPageList: async (pages) => {
    const result = await instance.post(`/cart/list`, pages);
    return result.data;
  },

  // 찜 추가/해제
  favorite: async (goodsId) => {
    try {
      const result = await instance.post(`/goods/favorite/${goodsId}`);
      if (result.data != null) {
        alert(`찜 등록 완료 => ${JSON.stringify(result.data)}`);
        return result.data;
      }
    } catch (err) {}
  },

  // 현재 상품의 찜 상태 불러오기
  favoriteInfo: async (goodsId) => {
    try {
      const result = await instance.post(`/goods/favoriteinfo/${goodsId}`);
      if (result.data != null) {
        alert(`찜 상태 가져오기 => ${JSON.stringify(result.data)}`);
        return result;
      }
    } catch (err) {}
  },

  // 찜 리스트 출력
  getFavoritePageList: async (pages) => {
    try {
      const result = await instance.post(`/goods/favorite`, pages);
      if (result.data != null) {
        console.log(' getFavoritePageList 응답 결과:', result.data);
        return result.data;
      }
    } catch (err) {}
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상  품 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // <GoodsList /> 전체 상품 리스트 출력 (메인) (완료)
  getGoodsPageList: async (pages) => {
    console.log(`getGoodsPageList() 호출됨, pages = ${JSON.stringify(pages)}`);
    try {
      const result = await instance.post(`/goods/list`, pages);
      if (result.data != null) {
        console.log('getGoodsPageList 응답 결과:', result.data);
        return result.data;
      }
    } catch (err) {}
  },

  // <AddGoods /> : 상품등록
  regGoods: async (goods) => {
    const formData = new FormData();
    formData.append('goodsName', goods.goodsName);
    formData.append('categoryId', goods.categoryId);
    formData.append('goodsState', goods.goodsState);
    formData.append('description', goods.description);
    formData.append('quantity', goods.quantity);
    formData.append('price', goods.price);
    if (goods.imageFile) {
      formData.append('imageFile', goods.imageFile); // 실제 파일 객체
    }

    try {
      const result = await instance.post('/goods/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (result.data != null) {
        console.log(`상품등록 완료 => ${result.data}`);
        return result.data;
      }
    } catch (err) {
      console.error('상품 등록 실패:', err);
      alert('상품 등록 중 에러가 발생했습니다.');
    }
  },

  // <ModifyGoods /> : 상품수정/삭제
  modify: async (goods) => {
    try {
      const result = await instance.post('/goods/modify', goods);
      if (result.data != null) {
        console.log(`상품수정 완료 => ${result.data}`);
        return result.data;
      }
    } catch (err) {
      console.error('상품수정 등록 실패:', err);
      alert('상품 수정 중 에러가 발생했습니다.');
    }
  },

  // 상품상세정보 (단일)
  goodsDetail: async (goodsId) => {
    const result = await instance.get(`/goods/detail/${goodsId}`);
    return result.data;
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리  뷰 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 리뷰목록 (상품)
  getReviewsPageList: async (pages, goodsId) => {
    console.log(`getPageList() 호출됨, goodsId = ${JSON.stringify(goodsId)}`);
    const result = await instance.post(`/goods/reviews/list/${goodsId}`, pages);
    if (result.data != null) {
      console.log('getReviewsPageList 응답 결과:', result.data);
      return result.data;
    } else {
      console.log('getReviewsPageList 호출 중 오류 발생:', result.data);
      return result.data;
    }
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

  //상품 페이징 목록
  getGoodsList: async (pages) => {
    const result = await axios.post(`${KH_DOMAIN}/goods/page/list`, pages);
    return result.data;
  },

  //배너 추가
  bannerInsert: async (newBanner) => {
    const formData = new FormData();
    formData.append('file', newBanner.imageFile);
    formData.append('position', newBanner.position.toString());
    const result = await axios.post(`${KH_DOMAIN}/goods/banner/insert`, formData);
    return result.data;
  },

  //베스트 상품 가져오기
  getBest: async () => {
    const result = await axios.get(`${KH_DOMAIN}/goods/best/list`);
    return result.data;
  },

  //베스트 상품 추가
  bestInsert: async (goodsId, position) => {
    const newBest = {
      goodsId: goodsId,
      position: position,
    };
    console.log(newBest);
    const result = await axios.post(`${KH_DOMAIN}/goods/best/insert`, newBest);
    return result.data;
  },
};

export default GoodsApi;
