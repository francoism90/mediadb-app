import { boot } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { StoreState } from 'src/interfaces/store'
import { Store } from 'vuex'

const storeKey: InjectionKey<Store<StoreState>> = Symbol('vuex')

export default boot(({ app, store }) => {
  app.provide(storeKey, store)
})

export { storeKey }
