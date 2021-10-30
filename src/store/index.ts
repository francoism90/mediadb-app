import { defineStore } from 'pinia';
import { SessionState } from 'src/interfaces/session';

export const useStore = defineStore('session', {
  state: () => (<SessionState>{
    redirectUri: '/',
    timestamp: 0,
    token: '',
    user: undefined,
  }),

  getters: {
    isAuthenticated(): boolean {
      return typeof this.token === 'string' && typeof this.user?.id === 'string';
    },
  },

  actions: {
    //
  },
});
