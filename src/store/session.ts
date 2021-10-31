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

    id(): string {
      return this.user?.id || '';
    },

    name(): string {
      return this.user?.name || '';
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
