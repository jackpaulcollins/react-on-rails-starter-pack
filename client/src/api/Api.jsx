import axios from 'axios';

export const TOKEN = 'jwt-token';
export const REFRESH_TOKEN = 'jwt-refresh-token';

const baseURL = process.env.NODE_ENV === 'production' ? 'your-front-end-domain' : 'http://localhost:3000/api/v1/';
const Api = axios.create({
  baseURL,
});

export const getToken = (key) => localStorage.getItem(key);

export const setToken = (key, token) => {
  localStorage.setItem(key, token);
};

export const clearToken = (key) => {
  localStorage.removeItem(key);
};

const attemptRefresh = (error) => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  return Api.post('/refresh', { refresh_token: refreshToken })
    .then((response) => {
      const { token } = response.data;

      if (token) {
        setToken(TOKEN, token);

        const { config } = error;
        config.headers.Authorization = `Bearer ${token}`;

        return axios.request(config);
      }

      return Promise.reject(response);
    })
    .catch(() => {
      clearToken(TOKEN);
      clearToken(REFRESH_TOKEN);
      window.location.href = '/login';
    });
};

Api.interceptors.request.use(
  (config) => {
    const token = getToken(TOKEN);

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data, status } = error.response;
    if (status === 401 && data.message === 'token expired') {
      attemptRefresh(error);
    }
    return Promise.reject(error);
  },
);

export default Api;
