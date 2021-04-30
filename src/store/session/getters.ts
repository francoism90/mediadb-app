import { SessionState, StoreState } from 'src/interfaces/store';
import { GetterTree } from 'vuex';

const getters: GetterTree<SessionState, StoreState> = {
  getTimestampDiff(state: SessionState): number {
    const currentDate = Date.now();
    const lastDate = state.timestamp?.valueOf() || currentDate;

    return Math.abs((lastDate - currentDate) / 1000);
  },

  getToken(state: SessionState): string | null {
    return state.token;
  },

  isAuthenticated(state: SessionState): boolean {
    if (!state.token || state.token.length === 0) {
      return false;
    }

    if (!state.user || !state.user.id) {
      return false;
    }

    return true;
  },

  redirectPath(state: SessionState): string {
    if (!state.redirectPath || state.redirectPath.length === 0) {
      return '/';
    }

    return state.redirectPath;
  },
};

export default getters;
