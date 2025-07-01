import axios from "axios";
import instance from "./axiosInstance";
const KH_DOMAIN = "http://localhost:8080";
const AdminApi = {
  //관리자자 조회
  detail: async () => {
    //요청 인터셉터를 통해 header
    console.log("admin호출합니다.");
    const result = await instance.get(`${KH_DOMAIN}/admin/detail`);
    return result.data;
  },

  //회원 리스트
  getPageList: async (pages) => {
    const result = await instance.post(
      `${KH_DOMAIN}/admin/list/search`,
      pages,
      {
        withCredentials: true,
      }
    );
    return result.data;
  },
  //회원 상세조회
  getUserData: async (id) => {
    const result = await instance.get(
      `${KH_DOMAIN}/admin/user/detail?id=${id}`
    );
    return result.data;
  },

  //상태변경
  changeState: async (id, state) => {
    const userState = {
      id: id,
      state: state,
    };
    console.log(userState);
    const result = await instance.post(
      `${KH_DOMAIN}/admin/user/state/update`,
      userState
    );

    return result.data;
  },
  //통계자료
  getStatistics: async () => {
    const result = await instance.get(`${KH_DOMAIN}/admin/statistics`);
    return result.data;
  },

  //등급 통계
  getGradeStatistics: async () => {
    const result = await instance.get(`${KH_DOMAIN}/admin/statistics/grade`);
    return result.data;
  },

  //등급 당 우수 회원 목록
  getGradeUserList: async (gradeType) => {
    const result = await instance.get(
      `${KH_DOMAIN}/admin/best/list?grade=${gradeType}`
    );
    return result.data;
  },

  //등급 업그레이드
  gradeUpgrade: async (newGrade) => {
    const result = await instance.put(`${KH_DOMAIN}/admin/upgrade`, newGrade);
    return result.data;
  },
  //배너 삭제제
  bannerDelete: async (selBanner) => {
    const result = await instance.delete(
      `${KH_DOMAIN}/admin/banner/delete?id=${selBanner}`
    );
    return result.data;
  },
  //배너 추가
  bannerInsert: async (newBanner) => {
    const formData = new FormData();
    formData.append("file", newBanner.imageFile);
    formData.append("position", newBanner.position.toString());
    const result = await instance.post(
      `${KH_DOMAIN}/admin/banner/insert`,
      formData
    );
    return result.data;
  },
  //베스트 상품 추가
  bestInsert: async (goodsId, position) => {
    const newBest = {
      goodsId: goodsId,
      position: position,
    };
    console.log(newBest);
    const result = await instance.post(
      `${KH_DOMAIN}/admin/best/insert`,
      newBest
    );
    return result.data;
  },
  //베스트 상품 삭제
  bestDelete: async (id) => {
    const result = await instance.delete(
      `${KH_DOMAIN}/admin/best/delete?id=${id}`
    );
    return result.data;
  },

  //카테고리 추가
  categoryInsert: async (category) => {
    const result = await instance.post(`${KH_DOMAIN}/admin/category/insert`, {
      categoryName: category,
    });
    return result.data;
  },
  //카테고리 삭제
  categoryDelete: async (id) => {
    const result = await instance.delete(
      `${KH_DOMAIN}/admin/category/delete?id=${id}`
    );
    return result.data;
  },

  //카테고리 수정
  categoryUpdate: async (id, categoryName) => {
    const result = await instance.patch(
      `${KH_DOMAIN}/admin/category/update?id=${id}&categoryName=${categoryName}`
    );
    return result.data;
  },
  //상품 재고 수정
  updateQuantity: async (id, quantity) => {
    const result = await instance.patch(
      `${KH_DOMAIN}/admin/goods/quantity/update?id=${id}&quantity=${quantity}`
    );
    return result.data;
  },

  //상품 상태 수정
  updateGoodsState: async (id, newState) => {
    const result = await instance.patch(
      `${KH_DOMAIN}/admin/goods/state/update?id=${id}&state=${newState}`
    );
    return result.data;
  },
  //주문 상태 수정
  updateOrderState: async (id, newState) => {
    const result = await instance.patch(
      `${KH_DOMAIN}/admin/order/state/update?id=${id}&state=${newState}`
    );
    return result.data;
  },

  //매출 통계 가져오기
  getOrderStatistics: async (date) => {
    const result = await instance.get(
      `${KH_DOMAIN}/admin/statistics/order?date=${date}`
    );
    return result.data;
  },

  //통계용 상품 랭크 리스트
  getGoodsRank: async () => {
    const result = await instance.get(
      `${KH_DOMAIN}/admin/statistics/goods/rank`
    );
    return result.data;
  },
};

export default AdminApi;
