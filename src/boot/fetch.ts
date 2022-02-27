import { createFetch } from '@vueuse/core';
import { set } from 'lodash';
import { getToken } from 'src/services/auth';

export const api = createFetch({
  baseUrl: process.env.API_URL,
  options: {
    beforeFetch({ options }) {
      set(options, 'headers.Authorization', `Bearer ${getToken()}`);

      return { options };
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});
