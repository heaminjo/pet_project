let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080';
} else {
  backendHost = 'http://13.209.222.217:8080'; // 서버 IP
}

export const API_BASE_URL = `${backendHost}`;
