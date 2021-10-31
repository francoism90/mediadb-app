import { defineStore } from 'pinia';
import { AuthResponse, SessionState, UserModel } from 'src/interfaces';

export const useStore = defineStore('session', {
  state: () => (<SessionState>{
    redirectUri: '',
    timestamp: 0,
    token: '',
    user: <UserModel>{},
  }),

  getters: {
    isAuthenticated(): boolean {
      return typeof this.token === 'string' && typeof this.user?.id === 'string';
    },
  },

  actions: {
    initialize(payload: AuthResponse): void {
      this.token = payload.token;
      this.user = payload.user;
      this.timestamp = Date.now();
    },
  },
});
