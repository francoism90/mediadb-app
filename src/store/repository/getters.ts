import { RepositoryParams } from 'src/interfaces/repository'
import { RepositoryState, StoreState } from 'src/interfaces/store'
import { GetterTree } from 'vuex'

const getters: GetterTree<RepositoryState, StoreState> = {
  isLoadable (state: RepositoryState): boolean {
    if (!state.meta.current_page || !state.meta.last_page) {
      return true
    }

    return (
      state.meta.current_page !== state.meta.last_page &&
      state.meta.current_page < state.meta.last_page
    )
  },

  getParams (state: RepositoryState): RepositoryParams {
    return state.params
  },

  nextPage (state: RepositoryState): number {
    const currentPage = state.meta.current_page || 0

    return currentPage + 1
  }
}

export default getters
