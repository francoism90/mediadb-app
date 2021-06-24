import { defineStore } from 'pinia';
import { AuthResponse, SessionState } from 'src/interfaces/session';
import { UserModel } from 'src/interfaces/user';

export const useSessionStore = defineStore({
  id: 'session',

  state: () => (<SessionState>{
    redirectUri: null,
    timestamp: null,
    token: null,
    user: <UserModel>{},
  }),

  getters: {
    isAuthenticated(): boolean {
      return (this.token !== null && this.user.id !== null);
    },
  },

  actions: {
    reset() {
      this.token = null;
      this.user = <UserModel>{};
      this.timestamp = Date.now();
    },

    initialize(payload: AuthResponse) {
      this.token = payload.token || null;
      this.user = payload.user || <UserModel>{};
      this.timestamp = Date.now();
    },
  },
});
