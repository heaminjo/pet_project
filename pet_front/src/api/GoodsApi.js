import axios from 'axios';
const KH_DOMAIN = 'http://localhost:8080';
export async function goodsApi(uri, method, userDTO) {
  // 1.1) headers
  let headers,
    data = '';

  // 1.2) axios 전송 options
  // if (uri.indexOf('cart') >= 0) {
  headers = { 'Content-Type': 'application/json' };
  // } else {
  //   headers = { 'Content-Type': 'multipart/form-data' };
  // }

  let options = {
    url: `${KH_DOMAIN}/${uri}/${prodId}`,
    // url: 'http://localhost:8080/goods/cart',
    method: method,
    headers: headers,
    data: data,
  };

  // 1.3) Axios 요청
  return await axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(`** apiCall Error status=${err.response.status}, message=${err.message}`);
      return Promise.reject(err.response.status);
    }); //catch
} //apiCall
