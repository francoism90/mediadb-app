import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import { StoreState } from 'src/interfaces/store'
import createPersistedState from 'vuex-persistedstate'
import session from './session'

const persistedState = createPersistedState({
  key: 'persist',
  paths: [
    'session.token',
    'session.timestamp'
  ],
  overwrite: true
})

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
