import { defineStore } from 'pinia';
import { AuthResponse, SessionState } from 'src/interfaces/session';

export const useSessionStore = defineStore({
  id: 'session',

  state: () => (<SessionState>{
    redirectUri: null,
    timestamp: null,
    token: null,
    user: null,
  }),

  getters: {
    isAuthenticated(): boolean {
      return (this.token !== null && this.user !== null);
    },
  },

  actions: {
    reset(): void {
      this.token = null;
      this.user = null;
      this.timestamp = Date.now();
    },

    initialize(payload: AuthResponse): void {
      this.token = payload.token;
      this.user = payload.user;
      this.timestamp = Date.now();
    },
  },
});
