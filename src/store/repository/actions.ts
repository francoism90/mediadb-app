import { ActionTree } from 'vuex'
import { StoreState, RepositoryState } from 'src/interfaces/store'

const actions: ActionTree<RepositoryState, StoreState> = {
  reset (context): void {
    context.commit('resetStore')
    context.commit('setTimestamp', Date.now())
  }
}

export default actions
