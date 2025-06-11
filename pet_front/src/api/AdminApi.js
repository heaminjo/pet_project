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

  userList: async () => {
    const result = await instance.get(`${KH_DOMAIN}/admin/list/all`);
    return result.data;
  },
  getPageList: async (pages) => {
    const result = await instance.post(`${KH_DOMAIN}/admin/list/search`, pages);
    return result.data;
  },
  getUserData: async (email) => {
    const result = await instance.get(
      `${KH_DOMAIN}/admin/user/detail?email=${email}`
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

  //배너 가져오기
  getBanner: async () => {
    const result = await instance.get(`${KH_DOMAIN}/admin/banner/list`);
    return result.data;
  },
};
export default AdminApi;
