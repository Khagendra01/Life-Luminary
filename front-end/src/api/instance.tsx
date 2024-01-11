import axios from 'axios';

const instance = axios.create({ baseURL: `https://localhost:7120/` });

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => {
    if (response.data && response.data.isSuccess) {
      return Promise.resolve(response.data.result);
    } else {
      return Promise.reject(response.data.message || 'Request failed');
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
