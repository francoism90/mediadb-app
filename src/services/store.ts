import { StoreState } from 'src/interfaces/store'
import { InjectionKey } from 'vue'
import { useStore as baseUseStore, Store } from 'vuex'

export const key: InjectionKey<Store<StoreState>> = Symbol('vuex')

export function useStore () {
  return baseUseStore(key)
}
