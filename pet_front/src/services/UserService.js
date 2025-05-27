import instance from "../api/axiosInstance";

//
async function fetchData() {
  try {
    const response = await instance.get("/api/data");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
export default fetchData;
