let backendHost;
let frontendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080';
  frontendHost = 'http://localhost:3000';
} else {
  backendHost = 'http://13.209.222.217:8080'; // 서버 IP
  frontendHost = 'http://13.209.222.217:3000';
}

export const API_BASE_URL = `${backendHost}`;
export const FRONTEND_BASE_URL = `${frontendHost}`;
export const KAKAO_REDIRECT_URI = `${frontendHost}/login`;
