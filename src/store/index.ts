import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex'
import { StoreState } from 'src/interfaces/store'
import createPersistedState from 'vuex-persistedstate'
import session from './session'

const persistedState = createPersistedState({
  key: 'persist',
  paths: [
    'session.token',
    'session.timestamp'
  ]
})

export const storeKey: InjectionKey<VuexStore<StoreState>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StoreState>({
    modules: {
      session
    },
    plugins: [persistedState],
    strict: !!process.env.DEBUGGING
  })

  return Store
})

export function useStore () {
  return vuexUseStore(storeKey)
}
