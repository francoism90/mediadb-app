import { RepositoryState, StoreState } from 'src/interfaces/store'
import { GetterTree } from 'vuex'

const getters: GetterTree<RepositoryState, StoreState> = {
  isLoadable (state: RepositoryState): boolean {
    if (state.autoload && !state.meta.last_page) {
      return true
    }

    if (!state.meta.current_page || !state.meta.last_page) {
      return true
    }

    return (
      state.meta.current_page !== state.meta.last_page &&
      state.meta.current_page < state.meta.last_page
    )
  }
}

export default getters
