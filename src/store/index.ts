import { store } from 'quasar/wrappers';
import { StoreState } from 'src/interfaces/store';
import repository from 'src/store/repository';
import session from 'src/store/session';
import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex';
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

export const tags = repository;
export const videos = repository;

export default store((/* { ssrContext } */) => {
  const Store = createStore<StoreState>({
    modules: {
      session,
      tags,
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
