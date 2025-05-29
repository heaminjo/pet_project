import axios from "axios";
import instance from "./axiosInstance";
const KH_DOMAIN = "http://localhost:8080";
const AdminApi = {
  //회원 조회
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
  userKeywordList: async (pages) => {
    const result = await instance.get(`${KH_DOMAIN}/admin/list/search`, pages);
    return result.data;
  },
};
export default AdminApi;
