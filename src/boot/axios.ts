import axios, { AxiosError } from 'axios';
import { set } from 'lodash';
import { stringify } from 'qs';
import { boot } from 'quasar/wrappers';

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer(params) {
    return stringify(params, {
      encodeValuesOnly: true,
      arrayFormat: 'comma',
      skipNulls: true,
    });
  },
});

export const setAuthHeader = (token: string) => set(api.defaults, 'headers.common.Authorization', `Bearer ${token}`);

export default boot(({ app, urlPath }) => {
  api.interceptors.response.use((response) => response, (error: AxiosError) => {
    // API rate limiting
    if (error?.response?.status === 429 && !urlPath.startsWith('/429')) {
      return Promise.reject({ url: '/429' });
    }

    return Promise.reject(error);
  });

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
