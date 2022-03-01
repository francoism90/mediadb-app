import { createFetch } from '@vueuse/core';
import { set } from 'lodash';
import { getToken } from 'src/services/auth';

export const api = createFetch({
  baseUrl: process.env.API_URL,
  options: {
    beforeFetch({ options }) {
      set(options, 'headers.Authorization', `Bearer ${getToken() || ''}`);
      set(options, 'headers.Content-Type', 'application/json');
      set(options, 'headers.X-Requested-With', 'XMLHttpRequest');

      return { options };
    },
  },
});

export const uri = createFetch({
  options: {
    beforeFetch({ options }) {
      set(options, 'headers.Authorization', `Bearer ${getToken() || ''}`);
      set(options, 'headers.Content-Type', 'application/json');
      set(options, 'headers.X-Requested-With', 'XMLHttpRequest');
      return { options };
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});
