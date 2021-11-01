import { defineStore } from 'pinia';
import { AuthResponse, SessionState, UserModel } from 'src/interfaces';

export const useStore = defineStore('session', {
  state: () => (<SessionState>{
    redirectUri: '/',
    timestamp: 0,
    token: '',
    user: <UserModel>{},
  }),

  getters: {
    id(): string {
      return this.user?.id || '';
    },

    name(): string {
      return this.user?.name || '';
    },

    isAuthenticated(): boolean {
      return this.token !== '' && this.id !== '';
    },
  },

  actions: {
    initialize(payload: AuthResponse): void {
      this.redirectUri = payload.redirectUri;
      this.token = payload.token;
      this.user = payload.user;
      this.timestamp = Date.now();
    },
  },
});

export const store = useStore();
