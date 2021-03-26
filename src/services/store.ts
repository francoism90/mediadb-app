import { storeKey } from 'src/boot/store'
import { useStore as baseUseStore } from 'vuex'

export function useStore () {
  return baseUseStore(storeKey)
}
