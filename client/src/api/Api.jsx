import axios from 'axios';

export const TOKEN = 'jwt-token';
export const REFRESH_TOKEN = 'jwt-refresh-token';

// eslint-disable-next-line operator-linebreak
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'your-front-end-domain'
    : 'http://localhost:3000/api/v1/';

const Api = axios.create({ baseURL });

export const getToken = (key) => localStorage.getItem(key);

export const setToken = (key, token) => {
  localStorage.setItem(key, token);
};

export const clearToken = (key) => {
  localStorage.removeItem(key);
};

export const exchange = async () => {
  const data = await Api.post('/exchange', { refresh_token: getToken(TOKEN) });
  const { user } = data.data;

  return { hydratedUser: user };
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
      return Promise.reject(error);
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
  // eslint-disable-next-line comma-dangle
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data, status } = error.response;
    if (status === 401 && data.message === 'token expired') {
      // eslint-disable-next-line no-return-await
      return await attemptRefresh(error);
    }
    return Promise.reject(error);
  }
);

export default Api;
