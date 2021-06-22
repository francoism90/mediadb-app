import { store } from 'quasar/wrappers';
import { StoreState } from 'src/interfaces/store';
import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex';
import player from 'src/store/player';
import session from 'src/store/session';
import videos from 'src/store/videos';
import createPersistedState from 'vuex-persistedstate';

const persistedState = createPersistedState({
  key: 'persist',
  paths: [
    'session.redirectPath',
    'session.token',
    'session.timestamp',
  ],
});

export const storeKey: InjectionKey<VuexStore<StoreState>> = Symbol('vuex-key');

export default store((/* { ssrContext } */) => {
  const Store = createStore<StoreState>({
    modules: {
      player,
      session,
      videos,
    },
    plugins: [persistedState],
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
