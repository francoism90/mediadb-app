import { UserModel } from 'components/UIComponents/Users';
import { defineStore } from 'pinia';

export interface SessionState {
  redirectUri: string,
  timestamp: number,
  token: string,
  user: UserModel | undefined,
}

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
