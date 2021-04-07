import { ActionTree } from 'vuex'
import { StoreState, PaginateState } from 'src/interfaces/store'

const actions: ActionTree<PaginateState, StoreState> = {
  reset (context): void {
    context.commit('resetStore')
    context.commit('setTimestamp', Date.now())
  }
}

export default actions
