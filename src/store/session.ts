import { defineStore } from 'pinia';
import { AuthResponse, SessionState } from 'src/interfaces/session';
import { UserModel, UserPreferences } from 'src/interfaces/user';

export const useStore = defineStore('session', {
  state: () => (<SessionState>{
    preferences: <UserPreferences>{},
    redirectUri: null,
    timestamp: null,
    token: null,
    user: <UserModel>{},
  }),

  getters: {
    isAuthenticated(): boolean {
      return this.token !== null && typeof this.user.id === 'string';
    },
  },

  actions: {
    reset(): void {
      this.token = null;
      this.user = <UserModel>{};
      this.timestamp = Date.now();
    },

    initialize(payload: AuthResponse): void {
      this.token = payload.token;
      this.user = payload.user;
      this.timestamp = Date.now();
    },
  },
});
