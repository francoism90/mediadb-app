import { boot } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { Store } from 'vuex'
import { StoreState } from 'src/interfaces/store'

const storeKey: InjectionKey<Store<StoreState>> = Symbol('vuex')

export default boot(({ app, store }) => {
  app.provide(storeKey, store)
})

export { storeKey }
